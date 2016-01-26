module Jekyll
  module ImgSizeFilter
    def img_size(src, kind)
      name = File.basename(src, ".*")
      type = case kind
         when "large" then "large"
         when "crop"  then "crop"
         else "medium"
      end
      ext = File.extname(src)
      "#{name}.#{type}#{ext}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImgSizeFilter)