# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'WireForge Requirements'
copyright = '2025, WireForge Team'
author = 'WireForge Team'
release = '0.1'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.todo',
    'sphinx.ext.viewcode',
    'sphinx_needs',
    'myst_parser',
]

templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'alabaster'
html_static_path = ['_static']

# -- Options for sphinx-needs ------------------------------------------------
needs_types = [
    dict(directive="preq", title="Product Requirement", prefix="REQ-PROD-", color="#FFCCBC", style="node"),
    dict(directive="freq", title="Functional Requirement", prefix="REQ-FUNC-", color="#B2EBF2", style="node"),
    dict(directive="nfreq", title="Non-Functional Requirement", prefix="REQ-NON-", color="#DCEDC8", style="node"),
    dict(directive="spec", title="Specification", prefix="SPEC_", color="#FED8B1", style="node"),
    dict(directive="impl", title="Implementation", prefix="IMPL_", color="#DAEDF2", style="node"),
    dict(directive="test", title="Test", prefix="TEST_", color="#DCB2BE", style="node"),
]

needs_extra_options = ['importance', 'related_stories']
needs_id_regex = r'^[A-Z]{3}-[A-Z]{3}-[A-Z]{3}-\d{3}$'
needs_id_required = True
needs_id_from_title = False
needs_id_padding = 3
needs_id_prefix = 'REQ_'
