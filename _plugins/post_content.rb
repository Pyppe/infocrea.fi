module Jekyll
  class PostContentConverter < Converter
    safe true

    priority :low

    def matches(ext)
      true
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      parts = content.split("<!--excerpt-->")
      if parts.length == 3
        parts[2]
      else
        content
      end
    end

  end
end