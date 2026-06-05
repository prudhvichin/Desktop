from twilio.rest import Client

client = Client(account_sid, auth_token)

client.messages.create(
    body="Hello from Linux!",
    from_="+1234567890",
    to="+919876543210"
)