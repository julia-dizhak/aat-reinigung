sprites:
	sprity create ./static/sprites_gen/ ./static/sprites/*.png -s ../scss/_sprites.scss --processor sprity-sass -d 1:72 -d 2:192 -d 1.5:192 -c  ../sprites_gen/

css:
	cd static && node-sass scss/main.scss css/main.css --watch
