# Deeplink

Deeplink is a browser extension for the [Pulumi Console](https://app.pulumi.com). It specifically deals with opening a deep-link URL for [Deskypus](https://deskypus.github.io) (a desktop app for Pulumi) which handles the specifics of pulling-down the Pulumi project.

:warning: This project is in preview status. Anything about this extension is subject to change without prior notice.

## Features

* Easily open any Pulumi project from your account on https://app.pulumi.com
* Clone Pulumi projects from the VCS using SSH
* Ensures that you have the right Pulumi account on your local machine in order to operate on the stacks
* Checks if the providers in your project are configured on your machine (aka pre-flight check)
  * Only AWS and Azure are supported at this time. Support for more providers will be added later with newer versions of the Deskypus desktop app

## Prerequisites

Download and install the latest version of [Deskypus](https://deskypus.github.io) for your platform.

## Installation

### Extensions web store

Not yet supported. Please check back later.

### From source

> Only supported in browsers that allow loading unpacked extensions.

You can easily install the latest version of this extension by grabbing the latest build artifact from the GitHub Actions workflow in this repo.

Once you have the build artifact downloaded, follow these steps:

1. Extract the contents of the zip file
1. In your browser, go to the extensions/add-ons installation page and click the **Load Unpacked** button
1. Now select the `extension` folder from the extracted zip file contents
1. Visit https://app.pulumi.com and click on the **Projects** tab in any organization and you should see a new button
that allows you to open the project locally on your machine
