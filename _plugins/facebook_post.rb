module Jekyll
  class FacebookPostTag < Liquid::Tag

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
      "<div style=\"margin-bottom: 20px;\" class=\"fb-post\" data-href=\"#{@url}\" data-width=\"500\"></div>"
    end
  end
end

Liquid::Template.register_tag('facebook', Jekyll::FacebookPostTag)
