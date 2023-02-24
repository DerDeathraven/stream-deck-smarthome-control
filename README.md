# stream-deck-smarthome-control

[![wakatime](https://wakatime.com/badge/user/baf819ad-1920-42f7-9957-867bec17c57c/project/d9f9bf9a-5e90-41bf-856a-3765bd5be598.svg)](https://wakatime.com/badge/user/baf819ad-1920-42f7-9957-867bec17c57c/project/d9f9bf9a-5e90-41bf-856a-3765bd5be598)

## WIP

## how to make it work on your machine for now

- install
- close your existing driver
- run once so that the standard config is intiated
- open your config

```json

 "buttonSettings": [
     {
       "type": "buttonSwitch",
       "protocol": "HTTP",
       "icons": [],
       "typeSpecifigConfig": {
         "path": "http://localhost:4000/api/buttons/streamdeck/buttons/1",
         "incomingPath": "/streamdeck/buttons/1"
       }
     },
      {
       "type": "button",
       "icons": [],
       "protocol": "MQTT",
       "typeSpecifigConfig": {
         "path": "streamdeck/test"
       }
     },
     {
       "type": "buttonSwitch",
       "icons": [],
       "protocol": "MQTT",
       "typeSpecifigConfig": {
         "path": "streamdeck/test",
         "incomingPath": "streamdeck/buttons/1"
       }
     },
     ]

```

- use these settings to play around
- change your MQTT broker in the const.ts file
- when bored: install my front-end and play around with that

## General

Using the node library for the Stream Deck this application works _instead_ of the normal drivers and controls all aspects of your Deck.

## Supported Standards.

- MQTT
- HTTP

## Used Technologies

- Socket.io
- MQTT
- StreamDeck JS API
