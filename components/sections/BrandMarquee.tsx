import Image from 'next/image';
import Marquee from 'react-fast-marquee';

function BrandShowcase() {
  const marqueeItems = [
    { image: "https://static.nc-myus.com/images/pub/www/uploads/image/47b4ca8c5ad448e1b8ceb86cb124b4e9/Walmart.png" },
    { image: "https://pngimg.com/uploads/ebay/ebay_PNG9.png" },
    { image: "https://static.vecteezy.com/system/resources/thumbnails/019/766/240/small/amazon-logo-amazon-icon-transparent-free-png.png" },
    { image: "https://www.hsgcap.com/wp-content/uploads/sites/15/2022/11/03-Alibaba-group.png" },
    { image: "https://upload.wikimedia.org/wikipedia/commons/0/04/Pinduoduologo.png" },
    { image: "https://upload.wikimedia.org/wikipedia/vi/c/c4/JD.com_logo.png" },
  ];
  return (
    <div className="flex items-center gap-12 px-2 mx-auto container justify-between w-full">
      <Marquee gradient={true} gradientColor="#F8F8F8" speed={40}>
        <div className="flex items-center">
          {[...marqueeItems, ...marqueeItems]
            .map((item, index) => (
              <Image
                placeholder="blur"
                blurDataURL="data:..."
                key={index}
                src={item?.image}
                width={100}
                height={100}
                alt="brand showcase"
                className=" w-16 md:w-20 xl:w-24 mx-12"
              />
            ))}
        </div>
      </Marquee>
    </div>
  );
}

export default BrandShowcase;
