# frozen_string_literal: true

require_relative "jekyll-bootstrap"
require "optparse"
require "jekyll/commands/build"
require "jekyll/commands/serve"

options = {
  "serving" => true,
  "watch" => true,
  "host" => "127.0.0.1",
  "port" => 4000,
}

OptionParser.new do |parser|
  parser.on("--host HOST") { |host| options["host"] = host }
  parser.on("--port PORT", Integer) { |port| options["port"] = port }
  parser.on("--detach") { options["detach"] = true }
  parser.on("--no-watch") { options["watch"] = false }
  parser.on("--skip-initial-build") { options["skip_initial_build"] = true }
end.parse!

Jekyll::Commands::Serve.start(options)
