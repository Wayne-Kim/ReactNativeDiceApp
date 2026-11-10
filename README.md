# Dice App

Welcome to the Dice App – a mobile application built using React Native, Babylon.js, and cannon.js for a realistic 3D dice rolling experience.

- [App Store](https://apps.apple.com/ph/app/%ED%98%BC%EB%8F%88%EC%9D%98-%EC%A3%BC%EC%82%AC%EC%9C%84/id6473676216)
- [Play Store](https://play.google.com/store/apps/details?id=kr.pe.wayne.app.dice)

![2024-02-2912 33 53-ezgif com-video-to-gif-converter](https://github.com/WayneKim92/ReactNativeDiceApp/assets/75321423/bf995ec7-b6e1-4bb0-8d05-706b62b28d51)


## Introduction

The Dice App is designed to provide users with an immersive and visually appealing 3D dice rolling experience. It utilizes React Native for the mobile app development, Babylon.js for the 3D rendering, and cannon.js for physics simulations.

## Features
- Realistic 3D dice rolling with physics simulation.
- Intuitive and user-friendly interface.
- Responsive design for various screen sizes.
- Cross-platform compatibility (iOS and Android).
- Banner Ads with Admob.
- Adjustable number of dice.
- Score recording.
- [Poor function] shake the device to roll the dice

## Ruby tooling

Use Ruby 3.2 or newer and Bundler 4 for `bundle install`. The CocoaPods toolchain uses patched ActiveSupport 7.2, Addressable, concurrent-ruby and REXML versions from `Gemfile.lock`. System Ruby 2.6 is no longer supported.

## JavaScript security compatibility

Use Node.js 22 or newer. `yarn` resolves the legacy `ip` dependency to the maintained `@webpod/ip` fork. Metro's callable `image-size` API is preserved by `scripts/image-size-compat`, which delegates parsing to patched image-size 2.x. Run `node --test scripts/tests/security-compat.cjs` to check malformed ICNS input, IP classification, and the image/Sharp APIs.
