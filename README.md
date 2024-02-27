# fossil-lib.github.io
API for meta data on Fossil Logic libraries.

**Fetch Wrap Dependency**:

   To fetch a wrap file from the Fossil WrapDB repositories simply run this command:

   ```bash
meson wrap install --type git --source https://fossil-lib.github.io.git --subproject-dir upstream/package-name
   ```

**Integrate Dependency**:
   ```meson
   project('proj', 'c')

   exe = executable('prog', 'main.c',
       dependencies : dependency('package-name')) # add this line

   test('basic', exe)
   ```
