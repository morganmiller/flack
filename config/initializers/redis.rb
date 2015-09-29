if Rails.env.production?
  $redis = Redis.new(:host => 'redis://redistogo:4d931ee1ca6bc1a1dcd9769c420e9050@bluegill.redistogo.com:9571/', :port=> 9571)
else
  $redis = Redis.new(:host => 'localhost', :port=> 6379)
end

