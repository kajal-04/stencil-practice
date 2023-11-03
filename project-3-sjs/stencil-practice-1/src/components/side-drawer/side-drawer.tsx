import { Component, Method, Prop, State, h } from "@stencil/core";

@Component({
    tag: 'ka-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
     
})

export class SideDrawer {
    @Prop({reflect: true}) sideDrawerTitle: string;
    @Prop({reflect: true, mutable: true}) opened: boolean;
    @State() showContactInfo = false;

    onCloseDrawer() {
        this.opened = false;
    }

    onContactChange(content: string) {
        this.showContactInfo = content === 'contact';
    }
    @Method()
    open() {
        this.opened = true;
    }

    render() {
        let mainContent = <slot />;
        if (this.showContactInfo) {
            mainContent = (
                <div id="contact-information">
                    <h2>Contact Infromation</h2>
                    <p>You can reach us via phone or email</p>
                    <ul>
                        <li>Phone: 49835252523</li>
                        <li>
                            E-Mail: <a href="./">elfekm kmrekmke </a>
                        </li>
                    </ul>
                </div>
            )
        }
        // let content = null;
        // if(this.open) {
        //     content = (
        //     <div>
        //         <aside>
        //             <header><h1>{this.sideDrawerTitle}</h1></header>
        //             <main>
        //                 <slot></slot>
        //             </main>
        //         </aside>
        //     </div>
        //     )
        // }
        return <div>
            {/* <div class="backdrop"/> */}
        <aside>
            <header>
                <h1>{this.sideDrawerTitle}</h1>
                <button onClick={this.onCloseDrawer.bind(this)}>X</button>
            </header>
            <section id="tabs">
                <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContactChange.bind(this, 'nav')} >Navigation</button>
                <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContactChange.bind(this, 'contact')}>Contact</button>
            </section>
            <main>
                {mainContent}
            </main>
        </aside>
    </div>;
    }
}