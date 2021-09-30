'use strict';

//scan[0, 1] are the initial coordinates, scan[2, 3] are the end coords (x0, y0, x1, y1).
//step is the "resolution". smaller = higher detail.
//pix is the charset for approximation intensity levels, in "little-endian" order.
function plot(xprA = 'x', xprB = 'y', scan = [-6, 4, 6, -4], step = 1 / 8, pix = ' +#')
{
   [xprA, xprB, scan, step, pix] = ['('+ xprA +')', '('+ xprB +')', scan.map(x => Number(x)), Number(step), String(pix)];
   return Function(`let out = '';
      for (let y = ${scan[1]}; y >= ${scan[3]}; y -= ${step})
      {
         for (let x = ${scan[0]}; x <= ${scan[2]}; x += ${step}) out += '${pix}'[(${xprB} + ${step} > ${xprA} && ${xprB} - ${step} < ${xprA}) + (${xprB} + ${step} / 2 > ${xprA} && ${xprB} - ${step} / 2 < ${xprA})] + (x < ${scan[2]} ? '' : '\\n');
      }
      return out`)()
}
