import React from 'react';
import { getStrapiMedia } from "./media";
import Image from "next/image";

export const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

export function jsonToHtml(jsonStr) {
    let obj = JSON.parse(jsonStr);

    let html = '';
    obj["blocks"].forEach(function(block, index) {
        
        //console.log("BLOCK === ", block);
        //console.log("getStrapiMedia(block['data']['file']['url'])", getStrapiMedia(block['data']['file']['url'] && getStrapiMedia(block['data']['file']['url'])));
        //console.log("getStrapiMedia(block['data']['file']['url'])", getStrapiMedia(block['data']['file']['url']));

        switch (block['type']) {
            case 'paragraph':
                html += '<p>'+ block['data']['text'] +'</p>';
                break;
            
            case 'header':
                html += '<h'+ block['data']['level'] +'>'+ block['data']['text'] +'</h'+ block['data']['level'] +'>';
                break;

            case 'raw':
                html += block['data']['html'];
                break;

            case 'list':
                let lsType = (block['data']['style'] == 'ordered') ? 'ol' : 'ul';
                html += '<' + lsType + '>';
                block['data']['items'].forEach(function(item, index) {
                    html += '<li>' + item + '</li>';
                });
                html += '</' + lsType + '>';
                break;
            
            case 'code':
                html += '<pre><code class="language-'+ block['data']['lang'] +'">'+ block['data']['code'] +'</code></pre>';
                break;
            
            case 'image':
                html += '<div class=""><img src="'+ block['data']['file']['url'] +'" /></div>';
                //html += '<div class="img_pnl"><Image width={200} height={80} className="h-48 w-full object-cover" src="'+ getStrapiMedia(block['data']['file']['url']) +'" alt="'+ getStrapiMedia(block['data']['file']['url']) +'" /></div>';
                break;
            
            default:
                break;
        }
    });
    //html = html.substring(1, html.length - 1)
    //console.log('HTML === ', html)
    return html;
}