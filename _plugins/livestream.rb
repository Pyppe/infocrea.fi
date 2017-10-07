module Jekyll
  class LivestreamTag < Liquid::Tag

    Regex = /\s*([^\s]+)\s*/

    def initialize(tag_name, input, tokens)
      super
      if input =~ Regex then
        @url = $1
      else
        raise "ERROR"
      end
    end

    def render(context)
      "<iframe class=\"livestream\" style=\"margin-bottom: 20px;\" src=\"#{@url}?autoPlay=false\" width=\"100%\" height=\"400\" frameborder=\"0\" scrolling=\"no\" allowfullscreen></iframe>"
    end
  end
end

Liquid::Template.register_tag('livestream', Jekyll::LivestreamTag)
