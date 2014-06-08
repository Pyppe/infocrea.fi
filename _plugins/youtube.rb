module Jekyll
  class YoutubeTag < Liquid::Tag

    Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

    def initialize(tag_name, markup, tokens)
      super

      if markup =~ Syntax then
        @id = $1

        if $2.nil? then
          @width = 480
          @height = 315
        else
          @width = $2.to_i
          @height = $3.to_i
        end
      else
        raise "No Youtube id"
      end
    end

    def render(context)
      "<div class=\"flex-video widescreen narrow\">" +
        "<iframe width=\"#{@width}\" height=\"#{@height}\" frameborder=\"0\"  allowfullscreen=\"\" src=\"http://www.youtube.com/embed/#{@id}\"></iframe>" +
      "</div>"
    end
  end
end

Liquid::Template.register_tag('youtube', Jekyll::YoutubeTag)
