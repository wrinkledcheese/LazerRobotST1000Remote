import { ForwardImage } from './forwardImage.js';
import { ReverseImage } from './reverseImage.js';
import { LeftImage } from './leftImage.js';
import { RightImage } from './rightImage.js';


/*																			   *
 * TODO: Instead of having all the images load a new image, just load or unload
 * the level indicator image, without replacing the whole image.  This should 
 * reduce, or eliminate the flickering.
 */
export const DirectionImage = {
	'forward':ForwardImage,
	'reverse':ReverseImage,
	'left':LeftImage,
	'right':RightImage
}