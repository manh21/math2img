# Math 2 Image

Generate mathematics formula to images formula in 270+ edge locations, powered by Cloudflare Workers

![Visitor](https://visitor-badge.laobi.icu/badge?page_id=manh21.math2img)

## Info

Math2Img generates custom mathematics formula to images on the fly, support forumal written for MathML, TeX and ASCIImath. All of these images are generated on Cloudflare's Edge, at 270+ locations, ensuring the best possible performance for all of your users. All images are cached for lengthy periods of time.

formula of relativity

![](https://math2img.manh21.com/api?bgColor=white&from=\gamma%20=%20\frac%20{1}%20{\sqrt{1-(\frac{v}{c}})^2}\\.svg)

formula of rectangular area

![](https://math2img.manh21.com/api?bgColor=white&from=L=PxL\\.svg)

## As a Serverless application

You can deploy this repository as a serverless application using an Cloudflare Workers account. This will create a Cloudflare Workers application that you can use to generate mathematics formula to images.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/manh21/math2img)

## Usage

Avaliable parameters:

```text
from=Hellow
```

```text
bgColor=white
```

```text
color=red
```

```text
https://math2img.manh21.com/api?bgColor=white&color=red&from=Hellow
```

![](https://math2img.manh21.com/api?bgColor=white&color=red&from=Hellow)

## License

Math API is released under the [MIT](https://github.com/manh21/math2img/blob/master/LICENSE) license.
