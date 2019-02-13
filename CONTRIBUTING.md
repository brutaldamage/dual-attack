# Contributing to Dual-Attack

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

This is a pretty short read, right now we don't have much in the way of policies for contributing. If you'd like to participate in the dev efforts for Dual-Attack we ask that you adhere to the following:

**Write code that is easy to read and understand.**

Right now, this is at the discretion of the maintainers of the repository (Lance & Drew). We wan't to keep the code relatviley simple when we can; we ask you do the same.

This guideline is still evolving. Since this code base started out as a fork of another web chess clock project, there are some things that are being cleaned up.

Generally, we're not too picky. We just want code to be maintainable.

**If possible, please test changes on web, android & iOS**

This code base is meant to run and be deployed to the web, android & iOS. If you are able (given your development environment) please verify your changes on all 3 platforms. 

The mobile app side of this project is built with Ionic Capacitor. Refer to the getting started section of the readme to get up and running with capacitor.

**Create a PR when you've got something good!**

This project is setup with CI/CD using Netlify and Microsoft Azure Devops. Both the mobile apps and the web app will build for PRs. All builds must be successful for a PR to be accepted. Once merged into master your contributions will be deployed with the next release. 
