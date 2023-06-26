import React from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { AccordionTrigger, AccordionContent, AccordionItem } from "./accordion-radix";
import Link from 'next/link';
import Image from 'next/image';

const AccordionCategoryMenu = ({ accordionData }: { accordionData: any }) => {

    function generatePath(grand_p: string, parent: string, child: string) {
        return `/category/${slugify(grand_p)}/${parent}/${slugify(child)}`
    }
    function slugify(text: string) {
        return text.toLowerCase().replace(/[\s&]+/g, '-');
    }

    function LoadImages(imagesrc: any) {
        if (imagesrc.logo === null && imagesrc.banner === null) {
            return "/images/default-product-image.png"
        }
        else if (imagesrc.logo === null) {
            return imagesrc.banner;
        }
        else {
            return imagesrc.logo;
        }
    }

    return (
        <Accordion.Root
            className="bg-mauve6 w-full rounded-md shadow-[0_2px_10px] shadow-black/5 py-4 "
            type="single"
            defaultValue={"0"}
            collapsible
        >
            {accordionData.children.map((child: any, indx: number) => (
                <AccordionItem  value={indx.toString()} className="">
                    <AccordionTrigger className="w-full data-[state=open]:text-blue-500 data-[state=open]:border-none border-b-muted border-b md:text-base sm:text-sm text-[9px]"> {child.name} </AccordionTrigger>
                    <AccordionContent className="">
                        <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-3 sm:gap-3'>
                            {child.sections.map((child_sec: any) => (
                                <Link href={generatePath(accordionData.name, child.slug, child_sec.name)} className="  rounded-lg p-2  group/item">
                                    <Image className=" mx-auto group-hover/item:-translate-y-3 transition translate-y-0 duration-300" src={LoadImages(child_sec.images)} height={150} width={150} alt={child_sec.name} />
                                    <p className=" mt-3  ml-0 text-center sm:text-sm text-[8px] my-auto leading-[10px]">{child_sec.name}</p>
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

            ))}


        </Accordion.Root>
    )

};



export default AccordionCategoryMenu;