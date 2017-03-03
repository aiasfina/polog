object @attachment
attributes :id

node(:url) do
  @attachment.file.url
end

node(:extname) do
  File.extname(@attachment.file.path)[1..-1]
end
