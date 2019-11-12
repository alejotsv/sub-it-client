import React from 'react';

/* TODO MAKE DROP ZONE 
*1 Change text or preview file when file is complete
*2 Change style on hover over with file
*3 Need event for if file is rejected on drop and click
*/
class ToyZone extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            hasFile: false,
            dropzoneText: "Click here or drag a file here !"

        };

        // TODO It works, but learn why its written like this
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.openFileDialog = this.openFileDialog.bind(this);
        this.fileInputRef = React.createRef();

        this.rejectFile = this.rejectFile.bind(this)
    }

    rejectFile(event) {
        this.stopEvent(event);

        console.log(`NOT ACCEPTED`);
    }


    /**
     * Handle file being dragged over drag area
     * @param {Object} event
     */
    onDragOver(event) {
        this.stopEvent(event);
        this.setState({ hover: true });
    }

    /**
     * Handle file being dragged out of drag area
     */
    onDragLeave(event) {
        this.stopEvent(event);
        this.setState({ hover: false });
    }

    /**
     * Handle adding files through file dialog (Clic)
     */
    onFilesAdded(event) {

        this.stopEvent(event);
        const { files } = event.target;
        console.log(`@@@@@@@@@@@@@@@@@@@@IM IN THE CHILD COMPONENT HERE IS THE EVENT.TARGET`, files);

        console.log(`!!!!!!!!!!!!!!!!!!!!!IM ABOUT TO LEAVE THE CHILD COMPONENT THIS IS THE FILE BEING RETURNED TO PARENT`, files[0]);
        //When it gets a file, use this function to update state in parent componenet (the form)
        this.props.updateParent(files[0])

        console.log(`********************************** I AM AFTER THE FUNCTION`);

        // Once A file is aadded by click, notify user
        this.setState({
            hasFile: true,
            dropzoneText: `Current File: ${files[0].name}`
        })
    }

    /**
     * Opens input(file) system dialog when any area in container div is pressed, since input has ref attribute
     * this.myInput.current holds the reference to the DOM node
     */
    openFileDialog() {
        this.fileInputRef.current.click();
    }

    /**
     * Handle file dropped into drag area
     * @param {Object} event
     */
    onDrop(event) {
        this.stopEvent(event);

        // get the file that was dropped from dropzone
        const { files } = event.dataTransfer;

        console.log(`$$$$$$$$$$$$$$$$$$$$ ERE IS THE DROPZONE DROP FILE`, files);

        console.log(`++++++++++++++++++++IM ABOUT TO LEAVE THE DROP ZONE ONDROP FUNCTION THIS IS THE FILE BEING RETURNED TO PARENT`, files[0]);

        // Prop Function to update state in parent
        this.props.updateParent(files[0])

        // Once A file is aadded by click, notify user
        this.setState({
            hasFile: true,
            hover: false,
            dropzoneText: `Current File: ${files[0].name}`
        })
    }

    /**
     * Prevent default event. Just in case 
     */
    stopEvent = event => {
        event.preventDefault();
        event.stopPropagation();
    };



    render() {

        // IF hovering file over dropzone
        const { hover } = this.state;
        const { hasFile } = this.state

        console.log(`Do we have a file??:`, hasFile);
        let bColor = '';

        const divStyle = {
            backgroundColor: { bColor }
        };

        return (
            <div
                style={divStyle}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                onDragLeave={this.onDragLeave}
                onDragOver={this.onDragOver}

                className={
                    !hasFile && !hover ? "drop-zone-container "
                        : hasFile && !hover ? 'drop-zone-container hasFile'
                            : hover ? 'drop-zone-container hover'
                                : 'drop-zone-container'
                }
            >
                <input
                    ref={this.fileInputRef}
                    type="file"
                    accept="video/*"
                    // multiple
                    onChange={this.onFilesAdded}
                // onInvalid={this.rejectFile}
                />

                <div className="drag-files">

                    {/* Drag files to upload */}
                    {this.state.dropzoneText}

                </div>

            </div>
        );
    }
}

export default ToyZone;