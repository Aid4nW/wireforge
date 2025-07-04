# Makefile for Sphinx documentation
#

# You can set these variables from the command line. 
SPHINXOPTS    = 
SPHINXBUILD   = sphinx-build
SOURCEDIR     = source
BUILDDIR      = _build

# Put it first so that "make clean" is the default. 
.PHONY: clean 

clean:
	rm -rf $(BUILDDIR)/*

.PHONY: html
html:
	$(SPHINXBUILD) -b html $(SOURCEDIR) $(BUILDDIR)/html $(SPHINXOPTS) $(O)

.PHONY: dirhtml
dirhtml:
	$(SPHINXBUILD) -b dirhtml $(SOURCEDIR) $(BUILDDIR)/dirhtml $(SPHINXOPTS) $(O)

.PHONY: latex
latex:
	$(SPHINXBUILD) -b latex $(SOURCEDIR) $(BUILDDIR)/latex $(SPHINXOPTS) $(O)

.PHONY: text
text:
	$(SPHINXBUILD) -b text $(SOURCEDIR) $(BUILDDIR)/text $(SPHINXOPTS) $(O)

.PHONY: man
man:
	$(SPHINXBUILD) -b man $(SOURCEDIR) $(BUILDDIR)/man $(SPHINXOPTS) $(O)

.PHONY: epub
epub:
	$(SPHINXBUILD) -b epub $(SOURCEDIR) $(BUILDDIR)/epub $(SPHINXOPTS) $(O)

.PHONY: doctest
doctest:
	$(SPHINXBUILD) -b doctest $(SOURCEDIR) $(BUILDDIR)/doctest $(SPHINXOPTS) $(O)

.PHONY: linkcheck
linkcheck:
	$(SPHINXBUILD) -b linkcheck $(SOURCEDIR) $(BUILDDIR)/linkcheck $(SPHINXOPTS) $(O)

.PHONY: xml
xml:
	$(SPHINXBUILD) -b xml $(SOURCEDIR) $(BUILDDIR)/xml $(SPHINXOPTS) $(O)

.PHONY: pseudoxml
pseudoxml:
	$(SPHINXBUILD) -b pseudoxml $(SOURCEDIR) $(BUILDDIR)/pseudoxml $(SPHINXOPTS) $(O)

.PHONY: json
json:
	$(SPHINXBUILD) -b json $(SOURCEDIR) $(BUILDDIR)/json $(SPHINXOPTS) $(O)

.PHONY: qthelp
qthelp:
	$(SPHINXBUILD) -b qthelp $(SOURCEDIR) $(BUILDDIR)/qthelp $(SPHINXOPTS) $(O)

.PHONY: devhelp
devhelp:
	$(SPHINXBUILD) -b devhelp $(SOURCEDIR) $(BUILDDIR)/devhelp $(SPHINXOPTS) $(O)

.PHONY: htmlhelp
htmlhelp:
	$(SPHINXBUILD) -b htmlhelp $(SOURCEDIR) $(BUILDDIR)/htmlhelp $(SPHINXOPTS) $(O)

.PHONY: applehelp
applehelp:
	$(SPHINXBUILD) -b applehelp $(SOURCEDIR) $(BUILDDIR)/applehelp $(SPHINXOPTS) $(O)

.PHONY: singlehtml
singlehtml:
	$(SPHINXBUILD) -b singlehtml $(SOURCEDIR) $(BUILDDIR)/singlehtml $(SPHINXOPTS) $(O)

.PHONY: pickle
pickle:
	$(SPHINXBUILD) -b pickle $(SOURCEDIR) $(BUILDDIR)/pickle $(SPHINXOPTS) $(O)

.PHONY: changes
changes:
	$(SPHINXBUILD) -b changes $(SOURCEDIR) $(BUILDDIR)/changes $(SPHINXOPTS) $(O)

.PHONY: epub
epub:
	$(SPHINXBUILD) -b epub $(SOURCEDIR) $(BUILDDIR)/epub $(SPXINXOPTS) $(O)

.PHONY: html
html:
	$(SPHINXBUILD) -b html $(SOURCEDIR) $(BUILDDIR)/html $(SPHINXOPTS) $(O)

.PHONY: clean
clean:
	rm -rf $(BUILDDIR)

.PHONY: help
help:
	@echo "Please use `make <target>` where <target> is one of"
	@echo "  html      to make standalone HTML files"
	@echo "  dirhtml   to make HTML files with a directory for each document"
	@echo "  latex     to make LaTeX files, you can run `make all-pdf` afterwards"
	@echo "  text      to make text files"
	@echo "  man       to make manual pages"
	@echo "  epub      to make an epub document"
	@echo "  doctest   to run all doctests embedded in the documentation (if enabled)"
	@echo "  linkcheck to check all external links for integrity"
	@echo "  xml       to make XML files"
	@echo "  pseudoxml to make pseudo-XML files"
	@echo "  json      to make JSON files"
	@echo "  qthelp    to make QtHelp files"
	@echo "  devhelp   to make DevHelp files"
	@echo "  htmlhelp  to make HTML Help files"
	@echo "  applehelp to make Apple Help files"
	@echo "  singlehtml to make a single HTML file"
	@echo "  pickle    to make pickle files"
	@echo "  changes   to make an overview of all changed/added/deprecated items"
	@echo "  clean     to remove all build artifacts"
