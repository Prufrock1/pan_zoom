
to view: npm run start

Firstly, for the pan zoom feature I selected react as a front end ui library. This was to provide quick structure and build out a component with reusability in mind. It's currently a stand alone component but can easily be made reusable and take configuration via props. I also use react state to keep track of zoom and pan variables and the render method to update styles. 
For Goal #1 I use css transform: translate with 50% left and top values to center the image within the container and also added the zoomin zoomout buttons that have enabled/disabled state. 
For Goal #2 a simple zoom in method multiplies the image size by 3 and relies on the default css positioning to remain centered. The zoom is handled by both button click and clicking the image itself. Also note that on zoom I render a higher resolution image file.
For Goal #3 I use a combination of dragStart, mouseUp and mouseMove event listeners to implement the image drag effect. during a drag event I use the cursor position and image offset position to calculate the movement of the pan on the mouseMove event. A consideration here was to calculate the image bounds. This is done with Math.min and max methods, we calculate the bounds for top, left, right and down to make sure the offset of the image not go beyond the container. 
If terms of improvements, I would take the steps to make this component accept configuration props for a custom image url and dimensions. Also in full disclosure, if the browser window height is less then the container height then the bottom bound is excessively shortened, I would put in a special condition to handle this case. Another optimization would be to include an image loader and also look into animations for the zoon and pan effect.

