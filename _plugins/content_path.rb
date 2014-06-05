module Jekyll
  module ContentPathFilter
    def content_path(input)
      input.gsub(/\/blog\//, "/data/")
    end
  end
end

Liquid::Template.register_filter(Jekyll::ContentPathFilter)