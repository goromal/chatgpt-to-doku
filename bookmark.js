javascript:(async function() {
  try {
    const a = document.createElement('a');
    const dom = document.querySelector('main > .flex-1 > .h-full .flex');
    const template = document.createElement('template');
    // const user_image = dom.querySelector('.items-end img.rounded-sm');
    // const avatar_data = await get_image_data(user_image);
    const title = document.title;
    const non_letters_re = /[^\p{L}\p{N}]+/gu;
    const trailing_dash_re = /(^-)|(-$)/g;
    const slug = title.toLowerCase()
      .replace(non_letters_re, "-")
      .replace(trailing_dash_re, '');
    template.innerHTML = dom.innerHTML;
    ['.items-end', 'img', 'svg', 'button', ':empty', '.items-end .text-xs'].forEach(selector => {
      template.content.querySelectorAll(selector).forEach(node => {
        if (!node.closest('.math') /*&& !is_avatar(node)*/) {
          node.remove();
        }
      });
    });
    // template.content.querySelectorAll('img').forEach(node => {
    //   node.setAttribute('alt', 'user avatar');
    //   ['srcset', 'style', 'src'].forEach(attr => {
    //     node.removeAttribute(attr);
    //   });
    // });
    a.href = URL.createObjectURL(new Blob([`<!DOCTYPE html>
<html>
<body>${template.innerHTML}<script>
// function decode(array) {
//   const ua = new Uint8Array(array);
//   return URL.createObjectURL(new Blob([ua], {type : "image/jpeg"}));
// }
// const avatar_data = {
//   '1x': decode([${avatar_data['1x'].toString()}]),
//   '2x': decode([${avatar_data['2x'].toString()}])
// };
// document.querySelectorAll('img').forEach(img => {
//    img.src = avatar_data['2x'];
//    img.srcset = \`\${avatar_data['1x']} 1x, \${avatar_data['2x']} 2x\`;
// });
</script></body></html>`], {type: 'text/html'}));
    a.download = `chat-gpt-${slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  } catch(e) {
    alert(e.message);
  }
  // function is_avatar(node) {
  //   return (node.matches('.items-end') && node.querySelector('svg.h-6.w-6, img')) ||
  //     node.closest('svg') ||
  //     node.matches('svg.h-6.w-6') ||
  //     node.matches('img[alt*="@"]')
  // }
  // function canvas_to_array(canvas) {
  //   return new Promise(resolve => {
  //     canvas.toBlob(blob => {
  //       blob.arrayBuffer().then(buffer => {
  //         resolve(new Uint8Array(buffer));
  //       });
  //     }, "image/jpeg", 0.95);
  //   });
  // }
  // function render_image(src, ctx) {
  //   return new Promise(resolve => {
  //     const image = new Image();
  //     image.onload = function() {
  //       ctx.canvas.width = image.width;
  //       ctx.canvas.height = image.height;
  //       ctx.drawImage(image, 0, 0);
  //       resolve();
  //     };
  //     image.src = src;
  //   });
  // }
  // async function get_image_data(img) {
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   await force_load_image(img);
  //   const src = get_src(img);

  //   const arr = await Promise.all(Object.entries(src).map(async ([scale, src]) => {
  //     await render_image(src, ctx);
  //     return [scale, await canvas_to_array(canvas)];
  //   }));
  //   return Object.fromEntries(arr);
  // }
  // function get_src(image) {
  //   const m = image.srcset.match(/(.*)\s+1x,\s*(.*)2x/);
  //   return {
  //     '1x': m[1],
  //     '2x': m[2]
  //   };
  // }
  // function force_load_image(image) {
  //   return new Promise(resolve => {
  //     if (image.srcset) {
  //       resolve();
  //     } else {
  //       const scroller = document.querySelector('[class^="react-scroll-to-bottom"]:not(.h-full)');
  //       const scrollTop = scroller.scrollTop;
  //       image.addEventListener('load', () => {
  //         scroller.scrollTop = scrollTop;
  //         resolve();
  //       }, { once: true });
  //       image.scrollIntoView();
  //     }
  //   });
  // }
})();
