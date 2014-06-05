module Jekyll
  module ImgSizeFilter
    def img_size(src, type = 'large')
      name = File.basename(src, ".*")
      ext = File.extname(src)
      "#{name}.#{type}#{ext}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImgSizeFilter)