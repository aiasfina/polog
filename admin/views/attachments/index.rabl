collection @attachments
attributes :id

node(:url) do |attachment|
  attachment.file.url
end

node(:extname) do |attachment|
  File.extname(attachment.file.path)[1..-1]
end
