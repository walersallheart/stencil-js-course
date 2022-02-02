import { Component, Prop } from "@stencil/core";

@Component({
    tag:'uc-side-drawer',
    styleUrl:'./side-drawer.css',
    shadow: true
})

export class SideDrawer {
    @Prop({ reflectToAttr: true }) title:string;
    @Prop({ reflectToAttr: true, mutable:true }) open:boolean;

    onCloseDrawer(){
        this.open = false;
    }

    onContentChange(content:string){
        console.log(content);
    }

    render(){
        let mainContent = <slot/>;

        mainContent =(
            <div id="contact-information">
                <h2>Contact Information</h2>
                <p>You can reach us  via phone or email.</p>
                <ul>
                    <li>Phone: 123-456-7890</li>
                    <li>E-Mail: <a href="mailto:something@something.com">something@something.com</a></li>
                </ul>
            </div>
        )

        return (
            <aside>
                <header>
                    <h1>{ this.title }</h1>
                    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button class="active" onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
                    <button onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside>
        )
    }
}