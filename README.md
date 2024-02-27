# fossil-lib.github.io

## Overview

Fossil WrapDB is a service that provides a centralized repository for wrap files, making it easy for Meson build system users to fetch and integrate dependencies from Fossil Logic into their projects. This readme guide outlines the steps to fetch a wrap file from Fossil WrapDB and integrate it into your Meson project.

## Fetching a Wrap File

To fetch a wrap file from the Fossil WrapDB repositories, use the following command:

```bash
meson wrap install --type git --source https://fossil-lib.github.io.git --subproject-dir upstream/package-name
```

## Integrating Dependency

After fetching the wrap file, integrate the dependency into your Meson project. Add the following lines to your Meson build file:

```meson
project('proj', 'c')

exe = executable('prog', 'main.c',
    dependencies : dependency('package-name')) # add this line

test('basic', exe)
```

Make sure to replace `'proj'`, `'c'`, `'prog'`, and `'main.c'` with your project name, language, executable name, and source file, respectively. The critical addition is the `dependency('package-name')` line, where `'package-name'` should match the name of the package you fetched in the previous step.

## Example

Here's an example of how your Meson build file might look after fetching and integrating a wrap dependency:

```meson
project('my_project', 'c')

exe = executable('my_program', 'main.c',
    dependencies : dependency('fscl-xtest-c')) # replace with the actual package name

test('basic', exe)
```

With these instructions, you should be able to easily fetch wrap files from Fossil WrapDB and integrate dependencies into your Meson project. If you encounter any issues or have questions, refer to the Meson documentation or Fossil WrapDB resources for additional support.
