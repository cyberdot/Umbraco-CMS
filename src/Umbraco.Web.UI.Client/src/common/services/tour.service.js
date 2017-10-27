(function () {
    'use strict';

    function tourService(eventsService, localStorageService) {

        var localStorageKey = "umbTours";
        var currentTour = null;

        var tours = [
            {
                "name": "Introduction",
                "alias": "umbIntroIntroduction",
                "group": "Getting Started",
                "steps": [
                    {
                        title: "Welcome to Umbraco - The Friendly CMS",
                        content: "<p>Thank you for choosing Umbraco - we think this could be the beginning of something beautiful. While it may feel overwhelming at first, we've done a lot to make the learning curve as smooth and fast as possible.</p><p>n this quick tour we will introduce you to the main areas of Umbraco and show you how to best get started.</p><p><em>IIf you don't want to take the tour now you can always start it by opening the Help drawer in the bottom left corner.<em></p>",
                        type: "intro"
                    },
                    {
                        element: "#applications",
                        elementPreventClick: true,
                        title: "Main Menu",
                        content: "This is the main menu in Umbraco backoffice. Here you can navigate betweeen the different sections, see your user profile and open the help drawer",
                        backdropOpacity: 0.6
                    },
                    {
                        element: "[data-element='section-content']",
                        elementPreventClick: true,
                        title: "Sections",
                        content: "Each area in Umbraco is called a <b>Section</b>. Right now you are in the Content section, when you want to go to another section simply click on the main menu and you'll be there in no time.",
                        backdropOpacity: 0.6
                    },
                    
                    {
                        element: "#tree",
                        elementPreventClick: true,
                        title: "The Tree",
                        content: "This is the <b>Tree</b> and will contain all the content of your website."
                    },
                    {
                        element: "[data-element='editor-content']",
                        elementPreventClick: true,
                        title: "Dashboards",
                        content: "A dashboard is the main view you are presented with when entering a section within the backoffice, and can be used to show valuable information to the users of the system."
                    },
                    {
                        element: "[data-element='global-search-field']",
                        title: "Search",
                        content: "The search allows you to quickly find content across sections within Umbraco."
                    },
                    {
                        element: "#applications [data-element='section-user']",
                        title: "User profile",
                        content: "Click on the <b>user photo</b> to open the user profile dialog.",
                        event: "click",
                        backdropOpacity: 0.6
                    },
                    {
                        element: "[data-element~='overlay-user']",
                        elementPreventClick: true,
                        title: "User profile",
                        content: "<p>This is where you can see details about your user, change your password and log out of Umbraco.</p><p>In the <b>User section</b> you will be able to do more advaned user management.</p>"
                    },
                    {
                        element: "[data-element~='overlay-user'] [data-element='button-overlayClose']",
                        title: "User profile",
                        content: "Let's close the user profile again",
                        event: "click"
                    },
                    {
                        element: "#applications [data-element='section-help']",
                        title: "Help",
                        content: "If you ever find yourself in trouble click here to open the help drawer.",
                        event: "click",
                        backdropOpacity: 0.6
                    },
                    {
                        element: "[data-element='drawer']",
                        elementPreventClick: true,
                        title: "Help",
                        content: "<p>In the help drawer you will find articles and videos related to the section you are using.</p><p>This is also where you will find the next tour on how to get started with Umbraco.</p>",
                        backdropOpacity: 0.6
                    },
                    {
                        element: "[data-element='drawer'] [data-element='help-tours']",
                        title: "Tours",
                        content: "To continue your journey on getting started with Umbraco, you can find more tours right here."
                    }
                ]
            },
            {
                "name": "Create document type",
                "alias": "umbIntroCreateDocType",
                "group": "Getting Started",
                "steps": [
                    {
                        title: "Create your first Document Type",
                        content: "<p>Step 1 of any site is to create a <strong>Document Type</strong>. A Document Type is a data container where you can add data fields. The editor can then input data and Umbraco can use it to output it in the relevant parts of a <strong>template</strong>.</p><p>In this tour you will learn how to set up a basic Document Type with a data field to enter a short text.</p>",
                        type: "intro"
                    },
                    {
                        element: "#applications [data-element='section-settings']",
                        title: "Navigate to the settings sections",
                        content: "In the <b>Settings section</b> we will find the document types.",
                        event: "click",
                        backdropOpacity: 0.6
                    },
                    {
                        element: "#tree [data-element='tree-item-documentTypes']",
                        title: "Create document type",
                        content: "<p>Hover the document types tree and click the <b>three small dots</b> to open the <b>context menu</b>.</p>",
                        event: "click",
                        eventElement: "#tree [data-element='tree-item-documentTypes'] [data-element='tree-item-options']"
                    },
                    {
                        element: "#dialog [data-element='action-documentType']",
                        title: "Create document type",
                        content: "<p>Click <b>Document Type</b> to create a new document type with a template.</p><p>We will use the template in a later tour when we need to render our content.</p>",
                        event: "click"
                    },
                    {
                        element: "[data-element='editor-name-field']",
                        title: "Enter a name",
                        content: "<p>Our document type needs a name. Enter <code>Home</code> in the field and click <b>Next</b>.",
                        view: "doctypename"
                    },
                    {
                        element: "[data-element='editor-description']",
                        title: "Enter a description",
                        content: "<p>A description helps to pick the right document type when creating content.</p><p>Write a description to our Home page. It could be: <br/><pre>The home to our website</pre></p>"
                    },
                    {
                        element: "[data-element='group-add']",
                        title: "Add tab",
                        content: "Tabs help us organize the content on a content page. Click <b>Add new tab</b> to add a tab.",
                        event: "click"
                    },
                    {
                        element: "[data-element='group-name-field']",
                        title: "Enter a name",
                        content: "Enter <code>Content</code> in the tab name.",
                        view: "tabName"
                    },
                    {
                        element: "[data-element='property-add']",
                        title: "Add a property",
                        content: "<p>Properties are the different types of data on our content page.</p><p>On our Home page we wan't to add a welcome text.</p><p>Click <b>Add property</b> to open the property dialog.</p>",
                        event: "click"
                    },
                    {
                        element: "[data-element~='overlay-property-settings'] [data-element='property-name']",
                        title: "Enter a name",
                        content: "Enter <code>Welcome Text</code> as name for the property.",
                        view: "propertyname"
                    },
                    {
                        element: "[data-element~='overlay-property-settings'] [data-element='property-description']",
                        title: "Enter a description",
                        content: "<p>A description will help to fill in the right content.</p><p>Enter a description for the property editor. It could be:<br/> <pre>Write a nice introduction text so the visitors feel welcome</pre></p>"
                    },
                    {
                        element: "[data-element~='overlay-property-settings'] [data-element='editor-add']",
                        title: "Add editor",
                        content: "The editor defines what data type the property is. Click <b>Add editor</b> to open the editor picker dialog.",
                        event: "click"
                    },
                    {
                        element: "[data-element~='overlay-editor-picker']",
                        elementPreventClick: true,
                        title: "Editor picker",
                        content: "<p>In the editor picker dialog we can pick one of the many build in editor.</p>"
                    },
                    {
                        element: "[data-element~='overlay-editor-picker'] [data-element='editor-Textarea']",
                        title: "Select editor",
                        content: "Select the <b>Textarea</b> editor which allows us to enter long texts.",
                        event: "click"
                    },
                    {
                        element: "[data-element~='overlay-editor-settings']",
                        elementPreventClick: true,
                        title: "Editor settings",
                        content: "Each property editor can have individual settings. We don't want to change any of these now."
                    },
                    {
                        element: "[data-element~='overlay-editor-settings'] [data-element='button-overlaySubmit']",
                        title: "Save editor",
                        content: "Click <b>Submit</b> to save the editor.",
                        event: "click"
                    },
                    {
                        element: "[data-element~='overlay-property-settings'] [data-element='button-overlaySubmit']",
                        title: "Add property to document type",
                        content: "Click <b>Submit</b> to add the property to the document type.",
                        event: "click"
                    },
                    {
                        element: "[data-element='button-save']",
                        title: "Save the document type",
                        content: "All we need now is to save the document type. Click <b>Save</b> to create and save your new document type.",
                        event: "click"
                    }
                ]
            },
            {
                "name": "Create Content",
                "alias": "umbIntroCreateContent",
                "group": "Getting Started",
                "steps": [
                    {
                        title: "Creating your first content node",
                        content: "<p>The <b>Content section</b> contains the content of the website. Content is displayed as <b>nodes</b> in the content tree.</p><p>In this tour we will learn how to create our <b>Home</b> page for our website.</p>",
                        type: "intro"
                    },
                    {
                        element: "#applications [data-element='section-content']",
                        title: "Navigate to the content sections",
                        content: "In the <b>Content section</b> we will find the content of our website.",
                        event: "click",
                        backdropOpacity: 0.6
                    },
                    {
                        element: "[data-element='tree-root']",
                        title: "Open context menu",
                        content: "<p>Open the context menu by hovering the root of the content section.</p><p>Now click the <b>three small dots</b> to the right.</p>",
                        event: "click",
                        eventElement: "[data-element='tree-root'] [data-element='tree-item-options']"
                    },
                    {
                        element: "[data-element='action-create-home']",
                        title: "Create Home page",
                        content: "<p>Click on <b>Home</b> to create a new page of type <b>Home</b>.</p>",
                        event: "click"
                    },
                    {
                        element: "[data-element='editor-content'] [data-element='editor-name-field']",
                        title: "Give your new page a name",
                        content: "<p>Our new page needs a name. Enter <code>Home</code> in the field and click <b>Next</b>.</p>",
                        view: "nodename"
                    },
                    {
                        element: "[data-element='editor-content'] [data-element='property-welcomeText']",
                        title: "Add a welcome text",
                        content: "<p>Add content to the <b>Welcome Text</b> field</p><p>If you don't have any ideas here is a start:<br/> <pre>I am learning Umbraco. High Five I Rock #H5IR</pre>.</p>"
                    },
                    {
                        element: "[data-element='editor-content'] [data-element='button-saveAndPublish']",
                        title: "Save and publish",
                        content: "<p>Now click the <b>Save and publish</b> button to save and publish your changes.</p>",
                        event: "click"
                    }
                ]
            },
            {
                "name": "Render in template",
                "alias": "umbIntroRenderInTemplate",
                "group": "Getting Started",
                "steps": [
                    {
                        title: "Render your content in a template",
                        content: "<p>Templating in Umbraco builds on the concept of <b>Razor Views</b> from asp.net MVC. - This tour is a sneak peak on how to write templates in Umbraco.</p><p>In this tour we will learn how to render content from our <b>Home</b> document type so we can see the content added to our Home page.</p>",
                        type: "intro"
                    },
                    {
                        element: "#applications [data-element='section-settings']",
                        title: "Navigate to the Settings section",
                        content: "<p>In the <b>Settings</b> section you will find all the templates</p><p>It is of course also possible to edit all your code files in your favorite code editor.</p>",
                        event: "click",
                        backdropOpacity: 0.6
                    },
                    {
                        element: "#tree [data-element='tree-item-templates']",
                        title: "Expand the Templates node",
                        content: "<p>To see all our templates click the <b>small triangle</b> to the left of the templates node.</p>",
                        event: "click",
                        eventElement: "#tree [data-element='tree-item-templates'] [data-element='tree-item-expand']",
                        view: "templatetree"
                    },
                    {
                        element: "#tree [data-element='tree-item-templates'] [data-element='tree-item-Home']",
                        title: "Open Home template",
                        content: "<p>Click the <b>Home</b> template to open and edit it.</p>",
                        eventElement: "#tree [data-element='tree-item-templates'] [data-element='tree-item-Home'] a.umb-tree-item__label",
                        event: "click"
                    },
                    {
                        element: "[data-element='editor-templates'] [data-element='code-editor']",
                        title: "Edit template",
                        content: '<p>The template can be edited here or in your favorite code editor.</p><p>To render the field from the document type add the following to the template:<br/> <pre>@Model.Content.GetPropertyValue("welcomeText")</pre></p>'
                    },
                    {
                        element: "[data-element='editor-templates'] [data-element='button-save']",
                        title: "Save the template",
                        content: "Click the <b>Save button</b> and your template will be saved.",
                        event: "click"
                    }
                ]
            },
            {
                "name": "View Home page",
                "alias": "umbIntroViewHomePage",
                "group": "Getting Started",
                "steps": [
                    {
                        title: "View your Umbraco site",
                        content: "<p>Our three main components to a page is done: <b>Document type, Template, and Content</b> - it is now time to see the result.</p><p>In this tour we will learn how to see our published website.</p>",
                        type: "intro"
                    },
                    {
                        element: "#applications [data-element='section-content']",
                        title: "Navigate to the content sections",
                        content: "In the <b>Content section</b> we will find the content of our website.",
                        event: "click",
                        backdropOpacity: 0.6
                    },
                    {
                        element: "#tree [data-element='tree-item-Home']",
                        title: "Open the Home page",
                        content: "<p>Click the <b>Home</b> page to open it</p>",
                        event: "click",
                        eventElement: "#tree [data-element='tree-item-Home'] a.umb-tree-item__label"
                    },
                    {
                        element: "[data-element='editor-content'] [data-element='tab-Generic properties']",
                        title: "Properties",
                        content: "<p>Under the properties tab you will find the default information about a content item.</p>",
                        event: "click"
                    },
                    {
                        element: "[data-element='editor-content'] [data-element='property-_umb_urls']",
                        title: "Open page",
                        content: "<p>Click the <b>Link to document</b> <i class='icon-out'></i> to view your page.</p><p>Tip: Click the preview button in the bottom right corner to preview changes without publishing them.</p>",
                        event: "click",
                        eventElement: "[data-element='editor-content'] [data-element='property-_umb_urls'] a[target='_blank']"
                    }
                ]
            },
            {
                "name": "The media library",
                "alias": "umbIntroMediaSection",
                "group": "Getting Started",
                "steps": [
                    {
                        title: "How to use the media library",
                        content: "<p>A website would be boring without media content. In Umbraco you can manage all your images, documents, videos etc. in the <b>Media section</b>. Here you can upload and organise your media items and see details about each item.</p><p>In this tour we will learn how to upload and orginise your Media library in Umbraco. It will also show you how to view details about a specific media item.</p>",
                        type: "intro"
                    },
                    {
                        element: "#applications [data-element='section-media']",
                        title: "Navigate to the media section",
                        content: "The <b>media</b> section is where you will manage all your media items.",
                        event: "click",
                        backdropOpacity: 0.6
                    },
                    {
                        element: "#tree [data-element='tree-root']",
                        title: "Create a new folder",
                        content: "<p>Let's first create a folder for our images. Hover the media root and click the <b>three small dots</b> on the right side of the item.</p>",
                        event: "click",
                        eventElement: "#tree [data-element='tree-root'] [data-element='tree-item-options']"
                    },
                    {
                        element: "#dialog [data-element='action-Folder']",
                        title: "Create a new folder",
                        content: "<p>Select the <b>Folder</b> options to select the type folder.</p>",
                        event: "click"
                    },
                    {
                        element: "[data-element='editor-media'] [data-element='editor-name-field']",
                        title: "Enter a name",
                        content: "<p>Enter <code>My folder</code> in the field.</p>"
                    },
                    {
                        element: "[data-element='editor-media'] [data-element='button-save']",
                        title: "Save the folder",
                        content: "<p>Click the <b>Save</b> button to create the new folder</p>",
                        event: "click"
                    },
                    {
                        element: "[data-element='editor-media'] [data-element='dropzone']",
                        title: "Upload images",
                        content: "<p>In the upload area you can upload your media items.</p><p>Click the <b>Upload button</b> and select a couple of images on your computer and upload them.</p>",
                        view: "uploadimages"
                    },
                    {
                        element: "[data-element='editor-media'] [data-element='media-grid-item-0']",
                        title: "View media item details",
                        content: "Hover the media item and <b>Click the purple bar</b> to view details about the media item",
                        event: "click",
                        eventElement: "[data-element='editor-media'] [data-element='media-grid-item-0'] [data-element='media-grid-item-edit']"
                    },
                    {
                        element: "[data-element='editor-media'] [data-element='property-umbracoFile']",
                        title: "The uploaded image",
                        content: "<p>Here you can see the image you have uploaded.</p><p>You can use the dot in the center of the image to set a focal point on the image.</p>"
                    },
                    {
                        element: "[data-element='editor-media'] [data-element='property-umbracoBytes']",
                        title: "Image size",
                        content: "<p>You will also find other details about the image, like the size.</p><p>You can add extra properties to an image by creating or editing the <b>Media types</b></p>"
                    },
                    {
                        element: "[data-element='editor-media'] [data-element='tab-Generic properties']",
                        title: "Properties",
                        content: "Like the content section you can also find default properties about the media item. You will find these under the properties tab.",
                        event: "click"
                    },
                    {
                        element: "[data-element='editor-media'] [data-element='property-_umb_urls']",
                        title: "Link to media",
                        content: "The path to the media item..."
                    },
                    {
                        element: "[data-element='editor-media'] [data-element='property-_umb_updatedate']",
                        title: "Last edited",
                        content: "...and information about when the media item has been created and edited."
                    }
                ]
            }
        ];

        function startTour(tour) {
            eventsService.emit("appState.tour.start", tour);
            currentTour = tour;
        }

        function endTour() {
            currentTour = null;
            eventsService.emit("appState.tour.end");
            currentTour = null;
        }

        function completeTour(tour) {
            saveInLocalStorage(tour);
            eventsService.emit("appState.tour.complete", tour);
            currentTour = null;
        }

        function getCurrentTour() {
            return currentTour;
        }
        
        function getAllTours() {
            setCompletedTours();
            return tours;
        }

        function getGroupedTours() {
            setCompletedTours();
            var groupedTours = _.groupBy(tours, "group");
            return groupedTours;
        }

        function getTourByAlias(tourAlias) {
            var tour = _.findWhere(tours, {alias: tourAlias});
            return tour;
        }

        function getCompletedTours() {
            var completedTours = localStorageService.get(localStorageKey);
            var aliases = _.pluck(completedTours, "alias");
            return aliases;
        }

        ///////////

        function setCompletedTours() {

            var storedTours = [];

            if (localStorageService.get(localStorageKey)) {
                storedTours = localStorageService.get(localStorageKey);
            }

            angular.forEach(storedTours, function (storedTour) {
                if (storedTour.completed === true) {
                    angular.forEach(tours, function (tour) {
                        if (storedTour.alias === tour.alias) {
                            tour.completed = true;
                        }
                    });
                }
            });

        }

        function saveInLocalStorage(tour) {
            var storedTours = [];
            var tourFound = false;

            if (localStorageService.get(localStorageKey)) {
                storedTours = localStorageService.get(localStorageKey);
            }

            if (storedTours.length > 0) {
                angular.forEach(storedTours, function (storedTour) {
                    if (storedTour.alias === tour.alias) {
                        storedTour.completed = true;
                        tourFound = true;
                    }
                });
            }

            if (!tourFound) {
                var storageObject = {
                    "alias": tour.alias,
                    "completed": true
                };
                storedTours.push(storageObject);
            }

            localStorageService.set(localStorageKey, storedTours);

        }

        var service = {
            startTour: startTour,
            endTour: endTour,
            completeTour: completeTour,
            getCurrentTour: getCurrentTour,
            getAllTours: getAllTours,
            getGroupedTours: getGroupedTours,
            getTourByAlias: getTourByAlias,
            getCompletedTours: getCompletedTours
        };

        return service;

    }

    angular.module("umbraco.services").factory("tourService", tourService);

})();
