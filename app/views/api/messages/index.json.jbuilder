json.array! @messages do |message|
  # json.content message.content
  # json.image message.image.url
  # json.created_at message.created_at
  # json.name message.user.name
  # json.id message.id
  json.name        message.user.name
  json.date        message.created_at.strftime('%Y/%m/%d %R')
  json.image       message.image.url
  json.id          message.id
  json.content     message.content
end