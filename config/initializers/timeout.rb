Rack::Timeout.timeout = ENV.fetch('REQUEST_TIMEOUT') { 15 }.to_i
