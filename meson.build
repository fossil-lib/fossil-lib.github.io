project('Fossil WrapDB', 'c', 'cpp',
    meson_version: '>=1.0.0',
    version: '0.1.0',
    subproject_dir: 'wrap',
    default_options: ['c_std=c18', 'cpp_std=c++17', 'werror=true', 'buildtype=minsize'])

deps_c = [
    dependency('fscl-xtest-c'),
    dependency('fscl-xmock-c'),
    dependency('fscl-xcore-c'),
    dependency('fscl-xutil-c'),
    dependency('fscl-xstring-c'),
    dependency('fscl-xscience-c'),
    dependency('fscl-xcube-c'),
    dependency('fscl-xfish-c'),
    dependency('fscl-xpattern-c'),
    dependency('fscl-xdata-c')
]

subdir('prog')
