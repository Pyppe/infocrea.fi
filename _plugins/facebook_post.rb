module Jekyll
  class FacebookPostTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @url = text
    end

    def render(context)
      "<div class=\"fb-post\" data-href=\"#{@url}\" data-width=\"500\"></div>"
    end
  end
end

Liquid::Template.register_tag('facebook', Jekyll::FacebookPostTag)