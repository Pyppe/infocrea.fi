module Jekyll
  class IframeTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @url = text
    end

    def render(context)
      "<iframe src=\"#{@url}\" width=\"640\" height=\"480\" frameborder=\"o\" allowfullscreen=\"\"></iframe>"
    end
  end
end

Liquid::Template.register_tag('iframe', Jekyll::IframeTag)
