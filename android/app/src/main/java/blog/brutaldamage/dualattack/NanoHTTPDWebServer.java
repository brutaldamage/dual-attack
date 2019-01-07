package blog.brutaldamage.dualattack;

import android.annotation.TargetApi;
import android.os.Build;
import android.util.Log;

import com.getcapacitor.JSObject;

import org.json.JSONException;
import org.json.JSONObject;

import fi.iki.elonen.NanoHTTPD;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.util.Iterator;
import java.util.UUID;
import java.util.HashMap;
import java.util.Map;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

public class NanoHTTPDWebServer extends NanoHTTPD {

    WebServerPlugin webserver;

    public NanoHTTPDWebServer(int port, WebServerPlugin webserver) {
        super(port);
        this.webserver = webserver;
    }

    private String getBodyText(IHTTPSession session) {
        Map<String, String> files = new HashMap<String, String>();
        Method method = session.getMethod();
        if (Method.PUT.equals(method) || Method.POST.equals(method)) {
            try {
                session.parseBody(files);
            } catch (IOException ioe) {
                return "{}";
            } catch (ResponseException re) {
                return "{}";
            }
        }
        // get the POST body
        return files.get("postData");
    }

    /**
     * Create a request object
     * <p>
     * [
     * "requestId": requestUUID,
     * "      body": request.jsonObject ?? "",
     * "      headers": request.headers,
     * "      method": request.method,
     * "      path": request.url.path,
     * "      query": request.url.query ?? ""
     * ]
     *
     * @param session
     * @return
     */
    private JSObject createJSONRequest(String requestId, IHTTPSession session) {
        JSObject jsonRequest = new JSObject();
        jsonRequest.put("requestId", requestId);
        jsonRequest.put("body", this.getBodyText(session));
        jsonRequest.put("headers", session.getHeaders());
        jsonRequest.put("method", session.getMethod());
        jsonRequest.put("path", session.getUri());
        jsonRequest.put("query", session.getQueryParameterString());
        return jsonRequest;
    }

    private String getContentType(JSONObject responseObject) throws JSONException {
        if (responseObject.has("headers") &&
                responseObject.getJSONObject("headers").has("Content-Type")) {
            return responseObject.getJSONObject("headers").getString("Content-Type");
        } else {
            return "text/plain";
        }
    }

    private Response newFixedFileResponse(File file, String mime) throws FileNotFoundException {
        Response res;
        res = newFixedLengthResponse(Response.Status.OK, mime, new FileInputStream(file), (int) file.length());
        res.addHeader("Accept-Ranges", "bytes");
        return res;
    }

    Response serveFile(Map<String, String> header, File file, String mime) {
        Response res;
        try {
            // Calculate etag
            String etag = Integer.toHexString((file.getAbsolutePath() + file.lastModified() + "" + file.length()).hashCode());

            // Support (simple) skipping:
            long startFrom = 0;
            long endAt = -1;
            String range = header.get("range");
            if (range != null) {
                if (range.startsWith("bytes=")) {
                    range = range.substring("bytes=".length());
                    int minus = range.indexOf('-');
                    try {
                        if (minus > 0) {
                            startFrom = Long.parseLong(range.substring(0, minus));
                            endAt = Long.parseLong(range.substring(minus + 1));
                        }
                    } catch (NumberFormatException ignored) {
                    }
                }
            }

            // get if-range header. If present, it must match etag or else we
            // should ignore the range request
            String ifRange = header.get("if-range");
            boolean headerIfRangeMissingOrMatching = (ifRange == null || etag.equals(ifRange));

            String ifNoneMatch = header.get("if-none-match");
            boolean headerIfNoneMatchPresentAndMatching = ifNoneMatch != null && ("*".equals(ifNoneMatch) || ifNoneMatch.equals(etag));

            // Change return code and add Content-Range header when skipping is
            // requested
            long fileLen = file.length();

            if (headerIfRangeMissingOrMatching && range != null && startFrom >= 0 && startFrom < fileLen) {
                // range request that matches current etag
                // and the startFrom of the range is satisfiable
                if (headerIfNoneMatchPresentAndMatching) {
                    // range request that matches current etag
                    // and the startFrom of the range is satisfiable
                    // would return range from file
                    // respond with not-modified
                    res = newFixedLengthResponse(Response.Status.NOT_MODIFIED, mime, "");
                    res.addHeader("ETag", etag);
                } else {
                    if (endAt < 0) {
                        endAt = fileLen - 1;
                    }
                    long newLen = endAt - startFrom + 1;
                    if (newLen < 0) {
                        newLen = 0;
                    }

                    FileInputStream fis = new FileInputStream(file);
                    fis.skip(startFrom);

                    res = newFixedLengthResponse(Response.Status.PARTIAL_CONTENT, mime, fis, newLen);
                    res.addHeader("Accept-Ranges", "bytes");
                    res.addHeader("Content-Length", "" + newLen);
                    res.addHeader("Content-Range", "bytes " + startFrom + "-" + endAt + "/" + fileLen);
                    res.addHeader("ETag", etag);
                }
            } else {

                if (headerIfRangeMissingOrMatching && range != null && startFrom >= fileLen) {
                    // return the size of the file
                    // 4xx responses are not trumped by if-none-match
                    res = newFixedLengthResponse(Response.Status.RANGE_NOT_SATISFIABLE, NanoHTTPD.MIME_PLAINTEXT, "");
                    res.addHeader("Content-Range", "bytes */" + fileLen);
                    res.addHeader("ETag", etag);
                } else if (range == null && headerIfNoneMatchPresentAndMatching) {
                    // full-file-fetch request
                    // would return entire file
                    // respond with not-modified
                    res = newFixedLengthResponse(Response.Status.NOT_MODIFIED, mime, "");
                    res.addHeader("ETag", etag);
                } else if (!headerIfRangeMissingOrMatching && headerIfNoneMatchPresentAndMatching) {
                    // range request that doesn't match current etag
                    // would return entire (different) file
                    // respond with not-modified

                    res = newFixedLengthResponse(Response.Status.NOT_MODIFIED, mime, "");
                    res.addHeader("ETag", etag);
                } else {
                    // supply the file
                    res = newFixedFileResponse(file, mime);
                    res.addHeader("Content-Length", "" + fileLen);
                    res.addHeader("ETag", etag);
                }
            }
        } catch (IOException ioe) {
            res = newFixedLengthResponse(Response.Status.FORBIDDEN, NanoHTTPD.MIME_PLAINTEXT, "FORBIDDEN: Reading file failed.");
        }

        return res;
    }

    @Override
    public Response serve(IHTTPSession session) {
        Log.d(this.getClass().getName(), "New request is incoming!");

        String requestUUID = UUID.randomUUID().toString();

        JSObject json = this.createJSONRequest(requestUUID, session);

        this.webserver.sendRequestEvent(json);

        while (!this.webserver.responses.containsKey(requestUUID)) {
            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        JSONObject responseObject = (JSONObject) this.webserver.responses.get(requestUUID);
        Response response = null;
        Log.d(this.getClass().getName(), "responseObject: " + responseObject.toString());

        if (responseObject.has("path")) {
            // TODO should specify a more correct mime-type
            try {
                return serveFile(session.getHeaders(), new File(responseObject.getString("path")), responseObject.getString("type"));
            }
            catch (JSONException e) {
                e.printStackTrace();
            }
            return response;
        }
        else {
            try {
                response = newFixedLengthResponse(
                          Response.Status.lookup(responseObject.getInt("status")),
                          getContentType(responseObject),
                          responseObject.getString("body")
                );

                Iterator<?> keys = responseObject.getJSONObject("headers").keys();
                while (keys.hasNext()) {
                    String key = (String) keys.next();
                    response.addHeader(
                            key,
                            responseObject.getJSONObject("headers").getString(key)
                    );
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
            return response;
        }
    }
}