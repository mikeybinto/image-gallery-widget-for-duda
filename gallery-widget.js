// 
// Copy entire code block to the javascript tab of Duda Widget Builder
//

function loadjscssfile(filename, filetype) {
    let fileref = null;
    if (filetype == "js") { //if filename is a external JavaScript file
        fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype == "css") { //if filename is an external CSS file
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (fileref !== null) {
        document.getElementsByTagName("head")[0].appendChild(fileref);
        return true;
    }
    return false;
}

function cssIsLoaded(cssFileName) {
    let ref = `link[href="${cssFileName}"]`;
    let linkEl = document.head.querySelector(ref);
    if (linkEl) {
        return true;
    } else {
        return false;
    }
}


//console.log('\n\n********** Entry point: Main Duda ********** ')

let nameSpace = `namespace.${data.config.uniqueId}`;
let uniteGalleryFlag = 'unitegallery-loaded';
let defaultThemeFlag = 'ug-theme-default-loaded';
let tilesThemeFlag = 'ug-theme-tiles-loaded';
let cssFile = 'https://stockolio.org/scripts/protellus/unitegallery/dist/css/unite-gallery.css';

dmAPI.runOnReady(nameSpace, function () {

    // Load the script files and ensure the element is ready
    // Because duda uses ajax for page transition, $.(document).ready() doesnt work


    if (!cssIsLoaded(cssFile)) {
        loadjscssfile(cssFile, 'css');
    }

    let uniteGallery = '';
    let tileTheme = '';

    // Load the script files if the loaded flags don't exist

    if (!element.getAttribute(uniteGalleryFlag)) {
        uniteGallery = $.getScript('https://stockolio.org/scripts/protellus/unitegallery/dist/js/unitegallery.min.js');
    } else {
        uniteGallery = new Promise((resolve, reject) => {
            resolve("unitegallery file already loaded");
        });
    }

    $.when(uniteGallery)
        .done(function () {
            element.setAttribute(uniteGalleryFlag, true);

            if (!element.getAttribute(tilesThemeFlag)) {
                tileTheme = $.getScript('https://stockolio.org/scripts/protellus/unitegallery/dist/themes/tiles/ug-theme-tiles.js');
            } else {
                tileTheme = new Promise((resolve, reject) => {
                    resolve("tilesTheme already loaded");
                });
            }

            $.when(tileTheme)

                .done(function () {

                    element.setAttribute(defaultThemeFlag, true);
                    element.setAttribute(tilesThemeFlag, true);

                    let gallery = {

                        //theme options:

                        theme_enable_preloader: true,		//enable preloader circle
                        theme_preloading_height: 200,		//the height of the preloading div, it show before the gallery
                        theme_preloader_vertpos: 100,		//the vertical position of the preloader
                        theme_gallery_padding: 0,			//the horizontal padding of the gallery from the sides
                        theme_auto_open: null,				//auto open lightbox at start - if some number gived, like 0

                        //gallery options:

                        gallery_theme: "tiles",			//choose gallery theme (if more then one themes includes)
                        gallery_width: "100%",				//gallery width
                        gallery_min_width: 150,				//gallery minimal width when resizing
                        gallery_background_color: "",		//set custom background color. If not set it will be taken from css.

                        //tile design options:

                        tiles_enable_transition: true,		//enable transition when screen width change

                        tile_enable_border: false,			//enable border of the tile
                        tile_border_width: 3,				//tile border width
                        tile_border_color: "#F0F0F0",		//tile border color
                        tile_border_radius: 0,				//tile border radius (applied to border only, not to outline)

                        tile_enable_outline: false,			//enable outline of the tile (works only together with the border)
                        tile_outline_color: "#8B8B8B",		//tile outline color

                        tile_enable_shadow: false,			//enable shadow of the tile
                        tile_shadow_h: 1,					//position of horizontal shadow
                        tile_shadow_v: 1,					//position of vertical shadow
                        tile_shadow_blur: 3,					//shadow blur
                        tile_shadow_spread: 2,				//shadow spread
                        tile_shadow_color: "#8B8B8B",		//shadow color

                        tile_enable_action: true,			//enable tile action on click like lightbox
                        tile_as_link: false,				//act the tile as link, no lightbox will appear
                        tile_link_newpage: true,			//open the tile link in new page

                        tile_enable_overlay: true,			//enable tile color overlay (on mouseover)
                        tile_overlay_opacity: 0.4,			//tile overlay opacity
                        tile_overlay_color: "#000000",		//tile overlay color

                        tile_enable_icons: true,			//enable icons in mouseover mode
                        tile_show_link_icon: false,			//show link icon (if the tile has a link). In case of tile_as_link this option not enabled
                        tile_space_between_icons: 26,		//initial space between icons, (on small tiles it may change)

                        tile_enable_image_effect: false,		//enable tile image effect
                        tile_image_effect_type: "bw",		//bw, blur, sepia - tile effect type
                        tile_image_effect_reverse: false,	//reverce the image, set only on mouseover state

                        //tile text panel options:

                        tile_enable_textpanel: false,		 	//enable textpanel
                        tile_textpanel_source: 'desc_title',		 	//title,desc,desc_title. source of the textpanel. desc_title - if description empty, put title
                        tile_textpanel_always_on: false,	 	//textpanel always visible
                        tile_textpanel_appear_type: 'slide', 	//slide, fade - appear type of the textpanel on mouseover
                        tile_textpanel_position: 'bottom', //inside_bottom, inside_top, inside_center, top, bottom the position of the textpanel
                        tile_textpanel_offset: 0,			    //vertical offset of the textpanel

                        tile_textpanel_padding_top: 8,		 	//textpanel padding top 
                        tile_textpanel_padding_bottom: 8,	 	//textpanel padding bottom
                        tile_textpanel_padding_right: 11,	 	//cut some space for text from right
                        tile_textpanel_padding_left: 11,	 	//cut some space for text from left
                        tile_textpanel_bg_opacity: 0.4,		 	//textpanel background opacity
                        tile_textpanel_bg_color: "#000000",	 	//textpanel background color
                        tile_textpanel_bg_css: {},			 	//textpanel background css

                        tile_textpanel_title_color: null,		 //textpanel title color. if null - take from css
                        tile_textpanel_title_font_family: null,	 //textpanel title font family. if null - take from css
                        tile_textpanel_title_text_align: null,	 //textpanel title text align. if null - take from css
                        tile_textpanel_title_font_size: null,	 //textpanel title font size. if null - take from css
                        tile_textpanel_title_bold: null,			 //textpanel title bold. if null - take from css
                        tile_textpanel_css_title: {},			 //textpanel additional css of the title

                        tile_textpanel_desc_color: null,			 //textpanel description font family. if null - take from css
                        tile_textpanel_desc_font_family: null,	 //textpanel description font family. if null - take from css
                        tile_textpanel_desc_text_align: null,	 //textpanel description text align. if null - take from css
                        tile_textpanel_desc_font_size: null,		 //textpanel description font size. if null - take from css
                        tile_textpanel_desc_bold: null,			 //textpanel description bold. if null - take from css
                        tile_textpanel_css_description: {},		 //textpanel additional css of the description

                        //lightbox options:

                        lightbox_type: "wide",							//compact / wide - lightbox type

                        lightbox_hide_arrows_onvideoplay: true,			//hide the arrows when video start playing and show when stop
                        lightbox_arrows_position: "sides",				//sides, inside: position of the arrows, used on compact type			
                        lightbox_arrows_offset: 10,						//The horizontal offset of the arrows
                        lightbox_arrows_inside_offset: 10,				//The offset from the image border if the arrows placed inside
                        lightbox_arrows_inside_alwayson: false,			//Show the arrows on mouseover, or always on.

                        lightbox_overlay_color: null,					//the color of the overlay. if null - will take from css
                        lightbox_overlay_opacity: 1,						//the opacity of the overlay. for compact type - 0.6
                        lightbox_top_panel_opacity: null,				//the opacity of the top panel

                        lightbox_close_on_emptyspace: true,				//close the lightbox on empty space

                        lightbox_show_numbers: false,					//show numbers on the right side
                        lightbox_numbers_size: null,					//the size of the numbers string
                        lightbox_numbers_color: null,					//the color of the numbers
                        lightbox_numbers_padding_top: null,				//the top padding of the numbers (used in compact mode)
                        lightbox_numbers_padding_right: null,			//the right padding of the numbers (used in compact mode)

                        lightbox_slider_image_border: false,            //enable border around the image (for compact type only)
                        lightbox_slider_image_border_width: 1,			//image border width
                        lightbox_slider_image_border_color: "#ffffff",	//image border color
                        lightbox_slider_image_border_radius: 0,			//image border radius

                        lightbox_slider_image_shadow: false,				//enable border shadow the image

                        lightbox_slider_control_swipe: true,				//true,false - enable swiping control
                        lightbox_slider_control_zoom: true,				//true, false - enable zooming control

                        //lightbox text panel:

                        lightbox_show_textpanel: false,						//show the text panel
                        lightbox_textpanel_width: 550,						//the width of the text panel. wide type only

                        lightbox_textpanel_enable_title: false,				//enable the title text
                        lightbox_textpanel_enable_description: false,		//enable the description text

                        lightbox_textpanel_padding_top: 5,					//textpanel padding top 
                        lightbox_textpanel_padding_bottom: 5,				//textpanel padding bottom
                        lightbox_textpanel_padding_right: 11,				//cut some space for text from right
                        lightbox_textpanel_padding_left: 11,				//cut some space for text from left

                        lightbox_textpanel_title_color: null,				//textpanel title color. if null - take from css
                        lightbox_textpanel_title_font_family: null,			//textpanel title font family. if null - take from css
                        lightbox_textpanel_title_text_align: null,			//textpanel title text align. if null - take from css
                        lightbox_textpanel_title_font_size: null,			//textpanel title font size. if null - take from css
                        lightbox_textpanel_title_bold: null,					//textpanel title bold. if null - take from css
                        lightbox_textpanel_css_title: {},					//textpanel additional css of the title

                        lightbox_textpanel_desc_color: null,					//textpanel description font family. if null - take from css
                        lightbox_textpanel_desc_font_family: null,			//textpanel description font family. if null - take from css
                        lightbox_textpanel_desc_text_align: null,			//textpanel description text align. if null - take from css
                        lightbox_textpanel_desc_font_size: null,				//textpanel description font size. if null - take from css
                        lightbox_textpanel_desc_bold: null,					//textpanel description bold. if null - take from css
                        lightbox_textpanel_css_description: {}				//textpanel additional css of the description

                    }


                    if (data.config.tilesType == "column") {
                        gallery.tiles_align = "center";					//align of the tiles in the space
                        gallery.tiles_space_between_cols = 3;			//space between images
                        gallery.tiles_space_between_cols_mobile = 3;     //space between cols for mobile type
                        gallery.tiles_include_padding = true;			//include padding at the sides of the columns, equal to current space between cols
                        gallery.tiles_set_initial_height = true;		//columns type related only
                        gallery.tiles_exact_width = data.config.tilesExactWidth;				//exact width of column - disables the min and max columns
                        gallery.tiles_col_width = parseInt(data.config.tilesColWidth);

                        if (data.config.tilesExactWidth === false) {
                            gallery.tiles_min_columns = parseInt(data.config.minColumns);					//min columns
                            gallery.tiles_max_columns = 0;					//max columns (0 for unlimited)

                        }

                    }
                    else if (data.config.tilesType == "nested") {
                        gallery.tiles_type = 'nested';
                        gallery.tiles_nested_optimal_tile_width = parseInt(data.config.nestedOptimalTileWidth);
                        gallery.tiles_space_between_cols = 3;			//space between images
                        gallery.tiles_space_between_cols_mobile = 3;     //space between cols for mobile type
                        gallery.tiles_min_columns = 2;
                    }
                    else {
                        gallery.tiles_type = 'justified';
                        gallery.tiles_justified_row_height = parseInt(data.config.rowHeight);
                        gallery.tiles_justified_space_between = 7;	//space between the tiles justified type
                        gallery.tiles_set_initial_height = true;		//columns type related only
                    }

                    if (data.config.lightboxImageBorder) gallery.lightbox_slider_image_border = data.config.lightboxImageBorder;
                    if (data.config.lightboxTextPanel) gallery.lightbox_show_textpanel = data.config.lightboxTextPanel;


                    if (data.config.textPanelSource) gallery.tile_textpanel_source = data.config.textPanelSource;

                    if (data.config.textPanelAlwaysOn) gallery.tile_textpanel_always_on = data.config.textPanelAlwaysOn;

                    if (data.config.textPanelAppearType) gallery.tile_textpanel_appear_type = data.config.textPanelAppearType;

                    if (data.config.textPanelPosition) gallery.tile_textpanel_position = data.config.textPanelPosition;


                    // 
                    // Text Panel
                    //

                    if ('textPanel' in data.config && data.config.textPanel) {
                        if ('textPanelBackground' in data.config) {
                            gallery.tile_textpanel_bg_css.backgroundColor = data.config.textPanelBackground;
                        }

                        gallery.tile_enable_textpanel = data.config.textPanel;
                        let textPanelElement = document.querySelector('.textPanelFontStyle');
                        if (textPanelElement) {
                            let style = getComputedStyle(textPanelElement);
                            if (style) {
                                if ('fontFamily' in style) {
                                    gallery.tile_textpanel_title_font_family = style.fontFamily;
                                }
                                if ('fontSize' in style) {
                                    gallery.tile_textpanel_title_font_size = parseInt(style.fontSize.substr(0, style.fontSize.length - 2));
                                }
                                if ('textAlign' in style) {
                                    gallery.tile_textpanel_title_text_align = style.textAlign;
                                }
                                if ('color' in style) {
                                    gallery.tile_textpanel_title_color = style.color;
                                }
                                if ('fontWeight' in style) {
                                    if (parseInt(style.fontWeight) > 600) {
                                        gallery.tile_textpanel_title_bold = true;
                                    }
                                    else {
                                        gallery.tile_textpanel_title_bold = false;
                                    }
                                }
                                if ('fontStyle' in style) {
                                    gallery.tile_textpanel_css_title.fontStyle = style.fontStyle;
                                }
                                if ('textDecoration' in style) {
                                    gallery.tile_textpanel_css_title.textDecoration = style.textDecoration;
                                }
                                if ('textDecorationColor' in style) {
                                    gallery.tile_textpanel_css_title.textDecorationColor = style.textDecorationColor;
                                }
                                if ('textDecorationLine' in style) {
                                    gallery.tile_textpanel_css_title.textDecorationLine = style.textDecorationLine;
                                }
                                if ('textDecorationSkipInk' in style) {
                                    gallery.tile_textpanel_css_title.textDecorationSkipInk = style.textDecorationSkipInk;
                                }
                                if ('textDecorationStyle' in style) {
                                    gallery.tile_textpanel_css_title.textDecorationStyle = style.textDecorationStyle;
                                }

                            }

                        }

                    }

                    //
                    // Light Box Title
                    //

                    if (('showLightboxTitle' in data.config && data.config.showLightboxTitle) || ('showLightboxDescription' in data.config && data.config.showLightboxDescription)) {
                        gallery.lightbox_show_textpanel = true;

                        if ('showLightboxTitle' in data.config && data.config.showLightboxTitle) {

                            gallery.lightbox_textpanel_enable_title = true;

                            let lightboxTitleElement = document.querySelector('.lightboxTitleFontStyle');
                            if (lightboxTitleElement) {
                                let style = getComputedStyle(lightboxTitleElement);
                                if (style) {
                                    if ('fontFamily' in style) {
                                        gallery.lightbox_textpanel_title_font_family = style.fontFamily;
                                    }
                                    if ('fontSize' in style) {
                                        gallery.lightbox_textpanel_title_font_size = parseInt(style.fontSize.substr(0, style.fontSize.length - 2));
                                    }
                                    if ('textAlign' in style) {
                                        gallery.lightbox_textpanel_title_text_align = style.textAlign;
                                    }
                                    if ('color' in style) {
                                        gallery.lightbox_textpanel_title_color = style.color;
                                    }
                                    if ('fontWeight' in style) {
                                        if (parseInt(style.fontWeight) > 600) {
                                            gallery.lightbox_textpanel_title_bold = true;
                                        }
                                        else {
                                            gallery.lightbox_textpanel_title_bold = false;
                                        }
                                    }
                                    if ('fontStyle' in style) {
                                        gallery.lightbox_textpanel_css_title.fontStyle = style.fontStyle;
                                    }
                                    if ('textDecoration' in style) {
                                        gallery.lightbox_textpanel_css_title.textDecoration = style.textDecoration;
                                    }
                                    if ('textDecorationColor' in style) {
                                        gallery.lightbox_textpanel_css_title.textDecorationColor = style.textDecorationColor;
                                    }
                                    if ('textDecorationLine' in style) {
                                        gallery.lightbox_textpanel_css_title.textDecorationLine = style.textDecorationLine;
                                    }
                                    if ('textDecorationSkipInk' in style) {
                                        gallery.lightbox_textpanel_css_title.textDecorationSkipInk = style.textDecorationSkipInk;
                                    }
                                    if ('textDecorationStyle' in style) {
                                        gallery.lightbox_textpanel_css_title.textDecorationStyle = style.textDecorationStyle;
                                    }
                                }

                            }

                        }


                        if ('showLightboxDescription' in data.config && data.config.showLightboxDescription) {

                            gallery.lightbox_textpanel_enable_description = true;

                            let lightboxDescriptionElement = document.querySelector('.lightboxDescriptionFontStyle');
                            if (lightboxDescriptionElement) {
                                let style = getComputedStyle(lightboxDescriptionElement);
                                if (style) {
                                    if ('fontFamily' in style) {
                                        gallery.lightbox_textpanel_desc_font_family = style.fontFamily;
                                    }
                                    if ('fontSize' in style) {
                                        gallery.lightbox_textpanel_desc_font_size = parseInt(style.fontSize.substr(0, style.fontSize.length - 2));
                                    }
                                    if ('textAlign' in style) {
                                        gallery.lightbox_textpanel_desc_text_align = style.textAlign;
                                    }
                                    if ('color' in style) {
                                        gallery.lightbox_textpanel_desc_color = style.color;
                                    }
                                    if ('fontWeight' in style) {
                                        if (parseInt(style.fontWeight) > 600) {
                                            gallery.lightbox_textpanel_desc_bold = true;
                                        }
                                        else {
                                            gallery.lightbox_textpanel_desc_bold = false;
                                        }
                                    }
                                    if ('fontStyle' in style) {
                                        gallery.lightbox_textpanel_css_description.fontStyle = style.fontStyle;
                                    }
                                    if ('textDecoration' in style) {
                                        gallery.lightbox_textpanel_css_description.textDecoration = style.textDecoration;
                                    }
                                    if ('textDecorationColor' in style) {
                                        gallery.lightbox_textpanel_css_description.textDecorationColor = style.textDecorationColor;
                                    }
                                    if ('textDecorationLine' in style) {
                                        gallery.lightbox_textpanel_css_description.textDecorationLine = style.textDecorationLine;
                                    }
                                    if ('textDecorationSkipInk' in style) {
                                        gallery.lightbox_textpanel_css_description.textDecorationSkipInk = style.textDecorationSkipInk;
                                    }
                                    if ('textDecorationStyle' in style) {
                                        gallery.lightbox_textpanel_css_description.textDecorationStyle = style.textDecorationStyle;
                                    }
                                }

                            }

                        }

                    }


                    let searchId = '#' + data.config.uniqueId;

                    $(searchId).unitegallery(gallery);

                });

        });

});

