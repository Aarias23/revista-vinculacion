# frozen_string_literal: true

require_relative "jekyll-bootstrap"
require "jekyll/commands/build"

options = {
  "serving" => false,
}

Jekyll::Commands::Build.process(options)
