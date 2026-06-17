# frozen_string_literal: true

# Jekyll 3.10.0 can fail to autoload Liquid tags and Jekyll submodules in this
# Windows/Ruby environment. This wrapper loads the required pieces explicitly so
# local builds match the GitHub Pages dependency set without patching installed gems.

require "liquid"

%w[
  assign
  break
  capture
  case
  comment
  continue
  cycle
  decrement
  for
  if
  ifchanged
  include
  increment
  raw
  table_row
  unless
].each { |tag| require "liquid/tags/#{tag}" }

module Jekyll
  module Filters; end
  module Drops; end
  module Converters; end
  module Tags; end
end

%w[
  filters/url_filters
  filters/grouping_filters
  filters/date_filters
].each { |component| require "jekyll/#{component}" }

%w[
  drop
  url_drop
  collection_drop
  document_drop
  excerpt_drop
  jekyll_drop
  site_drop
  static_file_drop
  unified_payload_drop
].each { |drop| require "jekyll/drops/#{drop}" }

require "jekyll"

%w[
  identity
  markdown
  smartypants
].each { |converter| require "jekyll/converters/#{converter}" }

require "jekyll/converters/markdown/kramdown_parser"

%w[
  include
  link
  post_url
  highlight
].each { |tag| require "jekyll/tags/#{tag}" }

require "jekyll/commands/build"

options = {
  "serving" => false,
}

Jekyll::Commands::Build.process(options)
