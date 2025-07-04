@ECHO OFF

pushd %~dp0

REM Command file for Sphinx documentation

if "%1" == "" goto help

%SPHINXBUILD% = sphinx-build
set SOURCEDIR=.
set BUILDDIR=_build

if "%1" == "clean" goto clean
if "%1" == "html" goto html
if "%1" == "dirhtml" goto dirhtml
if "%1" == "latex" goto latex
if "%1" == "text" goto text
if "%1" == "man" goto man
if "%1" == "epub" goto epub
if "%1" == "doctest" goto doctest
if "%1" == "linkcheck" goto linkcheck
if "%1" == "xml" goto xml
if "%1" == "pseudoxml" goto pseudoxml
if "%1" == "json" goto json
if "%1" == "qthelp" goto qthelp
if "%1" == "devhelp" goto devhelp
if "%1" == "htmlhelp" goto htmlhelp
if "%1" == "applehelp" goto applehelp
if "%1" == "singlehtml" goto singlehtml
if "%1" == "pickle" goto pickle
if "%1" == "changes" goto changes

:clean
	ECHO.Deleting contents of %BUILDDIR%...
	RD /s /q %BUILDDIR%
	GOTO end

:html
	%SPHINXBUILD% -b html %SOURCEDIR% %BUILDDIR%/html %SPHINXOPTS% %O%
	GOTO end

:dirhtml
	%SPHINXBUILD% -b dirhtml %SOURCEDIR% %BUILDDIR%/dirhtml %SPHINXOPTS% %O%
	GOTO end

:latex
	%SPHINXBUILD% -b latex %SOURCEDIR% %BUILDDIR%/latex %SPHINXOPTS% %O%
	GOTO end

:text
	%SPHINXBUILD% -b text %SOURCEDIR% %BUILDDIR%/text %SPHINXOPTS% %O%
	GOTO end

:man
	%SPHINXBUILD% -b man %SOURCEDIR% %BUILDDIR%/man %SPHINXOPTS% %O%
	GOTO end

:epub
	%SPHINXBUILD% -b epub %SOURCEDIR% %BUILDDIR%/epub %SPHINXOPTS% %O%
	GOTO end

:doctest
	%SPHINXBUILD% -b doctest %SOURCEDIR% %BUILDDIR%/doctest %SPHINXOPTS% %O%
	GOTO end

:linkcheck
	%SPHINXBUILD% -b linkcheck %SOURCEDIR% %BUILDDIR%/linkcheck %SPHINXOPTS% %O%
	GOTO end

:xml
	%SPHINXBUILD% -b xml %SOURCEDIR% %BUILDDIR%/xml %SPHINXOPTS% %O%
	GOTO end

:pseudoxml
	%SPHINXBUILD% -b pseudoxml %SOURCEDIR% %BUILDDIR%/pseudoxml %SPHINXOPTS% %O%
	GOTO end

:json
	%SPHINXBUILD% -b json %SOURCEDIR% %BUILDDIR%/json %SPHINXOPTS% %O%
	GOTO end

:qthelp
	%SPHINXBUILD% -b qthelp %SOURCEDIR% %BUILDDIR%/qthelp %SPHINXOPTS% %O%
	GOTO end

:devhelp
	%SPHINXBUILD% -b devhelp %SOURCEDIR% %BUILDDIR%/devhelp %SPHINXOPTS% %O%
	GOTO end

:htmlhelp
	%SPHINXBUILD% -b htmlhelp %SOURCEDIR% %BUILDDIR%/htmlhelp %SPHINXOPTS% %O%
	GOTO end

:applehelp
	%SPHINXBUILD% -b applehelp %SOURCEDIR% %BUILDDIR%/applehelp %SPHINXOPTS% %O%
	GOTO end

:singlehtml
	%SPHINXBUILD% -b singlehtml %SOURCEDIR% %BUILDDIR%/singlehtml %SPHINXOPTS% %O%
	GOTO end

:pickle
	%SPHINXBUILD% -b pickle %SOURCEDIR% %BUILDDIR%/pickle %SPHINXOPTS% %O%
	GOTO end

:changes
	%SPHINXBUILD% -b changes %SOURCEDIR% %BUILDDIR%/changes %SPHINXOPTS% %O%
	GOTO end

:help
	ECHO.Please use `make ^<target^>` where ^<target^> is one of
	ECHO.  html      to make standalone HTML files
	ECHO.  dirhtml   to make HTML files with a directory for each document
	ECHO.  latex     to make LaTeX files, you can run `make all-pdf` afterwards
	ECHO.  text      to make text files
	ECHO.  man       to make manual pages
	ECHO.  epub      to make an epub document
	ECHO.  doctest   to run all doctests embedded in the documentation (if enabled)
	ECHO.  linkcheck to check all external links for integrity
	ECHO.  xml       to make XML files
	ECHO.  pseudoxml to make pseudo-XML files
	ECHO.  json      to make JSON files
	ECHO.  qthelp    to make QtHelp files
	ECHO.  devhelp   to make DevHelp files
	ECHO.  htmlhelp  to make HTML Help files
	ECHO.  applehelp to make Apple Help files
	ECHO.  singlehtml to make a single HTML file
	ECHO.  pickle    to make pickle files
	ECHO.  changes   to make an overview of all changed/added/deprecated items
	ECHO.  clean     to remove all build artifacts

:end
popd
