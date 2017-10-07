module Jekyll
  module CleanMetaFilter
    def clean_meta(input)
      escape(strip_html(input)).
        gsub(/([\s\n\t]+)/, ' ').
        gsub(/^\s*(.*)\s*$/, '\1')
    end
  end
end

Liquid::Template.register_filter(Jekyll::CleanMetaFilter)
