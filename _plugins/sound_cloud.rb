module Jekyll
  class SoundCloudTag < Liquid::Tag

    Syntax = /^\s*(\d+).*/

    def initialize(tag_name, markup, tokens)
      super

      if markup =~ Syntax then
        @id = $1
      else
        raise "No SoundCloud id"
      end
    end

    def render(context)
      "<iframe style=\"margin-bottom: 20px;\" width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"0\" allowfullscreen=\"\" " +
      "src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/#{@id}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false\"></iframe>"
    end
  end
end

Liquid::Template.register_tag('sound_cloud', Jekyll::SoundCloudTag)
