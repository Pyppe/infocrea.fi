require 'json'
require 'net/http'
require 'digest/md5'

module Jekyll
  class FlickrEmbedTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text           = text
      @cache_disabled = false
      @cache_folder   = File.expand_path "../.flickr-embed", File.dirname(__FILE__)
      FileUtils.mkdir_p @cache_folder
    end

    def render(context)
      args       = @text.split(/\s+/).map(&:strip)
      api_params = {'url' => args.shift, 'format' => 'json'}

      args.each do |arg|
        k,v = arg.split('=').map(&:strip)
        if k && v
          if v =~ /^'(.*)'$/
            v = $1
          end
          api_params[k] = v
        end
      end

      html_output(api_params)
    end

    def html_output(api_params)
      body = "Flickr could not be embedded"
      if response = cached_response(api_params) || flickr_oembed(api_params)
        body = response['html'] || response['error'] || body
        body = body.gsub(/^<a /, '<a data-header="true" ')
      end
      "<div class='embed flickr'>#{body}</div>"
    end

    def cache(api_params, data)
      cache_file = cache_file_for(api_params)
      File.open(cache_file, "w") do |f|
        f.write(data)
      end
    end

    def cached_response(api_params)
      return nil if @cache_disabled
      cache_file = cache_file_for(api_params)
      JSON.parse(File.read(cache_file)) if File.exist?(cache_file)
    end

    def url_params_for(api_params)
      api_params.keys.sort.map do |k|
        "#{CGI::escape(k)}=#{CGI::escape(api_params[k])}"
      end.join('&')
    end

    def cache_file_for(api_params)
      filename = "#{Digest::MD5.hexdigest(url_params_for(api_params))}.json"
      File.join(@cache_folder, filename)
    end

    def flickr_oembed(api_params)
      response = Net::HTTP.get(URI.parse("https://www.flickr.com/services/oembed?#{url_params_for(api_params)}"))
      cache(api_params, response) unless @cache_disabled
      JSON.parse(response)
    end
  end

  class FlickrEmbedTagNoCache < FlickrEmbedTag
    def initialize(tag_name, text, token)
      super
      @cache_disabled = true
    end
  end
end

Liquid::Template.register_tag('flickr_embed', Jekyll::FlickrEmbedTag)
Liquid::Template.register_tag('flickr_embed_nocache', Jekyll::FlickrEmbedTagNoCache)
