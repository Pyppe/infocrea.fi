module Jekyll
  class FlickrSetTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      regex = / *(\d+) *(\w+)? *$/i
      @set_id, username = text.match(regex).captures
      @username = username ? username : 'jarmolahti'
    end

    def render(context)
      flashvars = "offsite=true&amp;lang=en-us&amp;page_show_url=%2Fphotos%2F#{@username}%2Fsets%2F#{@set_id}%2Fshow%2F&amp;page_show_back_url=%2Fphotos%2F#{@username}%2Fsets%2F#{@set_id}%2F&amp;set_id=#{@set_id}&amp;jump_to="
      "<div class=\"flex-video narrow\"><object width=\"400\" height=\"300\">" +
        "<param name=\"flashvars\" value=\"#{flashvars}\"></param>" +
        "<param name=\"movie\" value=\"https://www.flickr.com/apps/slideshow/show.swf?v=143270\"></param>" +
        "<param name=\"allowFullScreen\" value=\"true\"></param>" +
        "<embed type=\"application/x-shockwave-flash\" src=\"https://www.flickr.com/apps/slideshow/show.swf?v=143270\" " +
          "allowFullScreen=\"true\" flashvars=\"#{flashvars}\" " +
          "width=\"400\" height=\"300\"></embed></object></div>"
    end
  end
end

Liquid::Template.register_tag('flickr_set', Jekyll::FlickrSetTag)
