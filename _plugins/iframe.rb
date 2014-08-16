module Jekyll
  class IframeTag < Liquid::Tag

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
      "<iframe src=\"#{@url}\" width=\"480\" height=\"315\" frameborder=\"0\" allowfullscreen=\"\"></iframe>"
    end
  end
end

Liquid::Template.register_tag('iframe', Jekyll::IframeTag)
