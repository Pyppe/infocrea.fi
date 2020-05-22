module Jekyll
  module ContentPathFilter
    def content_path(input)
      # input = _posts/2014-06-05-esimerkki.md
      regex = /_posts\/(\d{4})-(\d\d)-(\d\d)-(.+)\.[a-z]{2,}$/i
      year, month, day, slug = input.gsub(/\/#excerpt/, '').match(regex).captures
      "/data/#{year}/#{month}-#{day}-#{slug}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::ContentPathFilter)
