import ton from "/npm/ton@13.11.2.js";
const { contractAddress, Cell, beginCell, endCell, Address, toNano, fromNano, WalletContractV4, TonClient, internal, storeStateInit } = ton;

const login_menu = `
    <div class="de-login-menu" style="background-size: cover;">
        <a href="create-options.html" class="btn-main"><i class="fa fa-plus"></i><span>Create</span></a>

        <span id="de-click-menu-notification" class="de-menu-notification">
            <span class="d-count">8</span>
            <i class="fa fa-bell"></i>
        </span>

        <span id="de-click-menu-profile" class="de-menu-profile">                           
            <img src="images/author_single/author_thumbnail.jpg" class="img-fluid" alt="">
        </span>

        <div id="de-submenu-notification" class="de-submenu" style="display: none; background-size: cover;">
            <div class="de-flex" style="background-size: cover;">
                <div style="background-size: cover;"><h4>Notifications</h4></div>
                <a href="#">Show all</a>
            </div>

            <ul>
                <li>
                    <a href="#">
                        <img class="lazy" src="images/author/author-2.jpg" alt="">
                        <div class="d-desc" style="background-size: cover;">
                            <span class="d-name"><b>Mamie Barnett</b> started following you</span>
                            <span class="d-time">1 hour ago</span>
                        </div>
                    </a>  
                </li>
                <li>
                    <a href="#">
                        <img class="lazy" src="images/author/author-3.jpg" alt="">
                        <div class="d-desc" style="background-size: cover;">
                            <span class="d-name"><b>Nicholas Daniels</b> liked your item</span>
                            <span class="d-time">2 hours ago</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img class="lazy" src="images/author/author-4.jpg" alt="">
                        <div class="d-desc" style="background-size: cover;">
                            <span class="d-name"><b>Lori Hart</b> started following you</span>
                            <span class="d-time">18 hours ago</span>
                        </div>
                    </a>    
                </li>
                <li>
                    <a href="#">
                        <img class="lazy" src="images/author/author-5.jpg" alt="">
                        <div class="d-desc" style="background-size: cover;">
                            <span class="d-name"><b>Jimmy Wright</b> liked your item</span>
                            <span class="d-time">1 day ago</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img class="lazy" src="images/author/author-6.jpg" alt="">
                        <div class="d-desc" style="background-size: cover;">
                            <span class="d-name"><b>Karla Sharp</b> started following you</span>
                            <span class="d-time">3 days ago</span>
                        </div>
                    </a>    
                </li>
            </ul>
        </div>

        <div id="de-submenu-profile" class="de-submenu" style="display: none; background-size: cover;">
            <div class="d-name" style="background-size: cover;">
                <h4>Monica Lucas</h4>
                <a href="profile.html">Set display name</a>
            </div>
            <div class="spacer-10" style="background-size: cover;"></div>
            <div class="d-balance" style="background-size: cover;">
                <h4>Balance</h4>
                <span>12.858 ETH</span>
            </div>
            <div class="spacer-10" style="background-size: cover;"></div>
            <div class="d-wallet" style="background-size: cover;">
                <h4>My Wallet</h4>
                <span id="wallet" class="d-wallet-address">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span>
                <button id="btn_copy" title="Copy Text">Copy</button>
            </div>

            <div class="d-line" style="background-size: cover;"></div>

            <ul class="de-submenu-profile">
                <li><a href="author.html"><i class="fa fa-user"></i> My profile</a>
                </li><li><a href="profile.html"><i class="fa fa-pencil"></i> Edit profile</a>
                </li><li><a href="#"><i class="fa fa-sign-out"></i> Sign out</a>
            </li></ul>
        </div>
        <span id="menu-btn"></span>
    </div>`;


const $menu_side_area = document.querySelector('.menu_side_area');
const $connect_btn = document.querySelector('.btn-wallet');

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://counter.foton.sh/tonconnect-manifest.json',
    //buttonRootId: 'ton-connect'
});

tonConnectUI.onStatusChange(async wallet => {
    if (tonConnectUI.wallet) {
        console.log(tonConnectUI.wallet)
        const address = TonConnectSDK.toUserFriendlyAddress(tonConnectUI.account.address, true); //https://github.com/ton-connect/sdk/tree/main/packages/sdk#convert-address-to-user-friendly-format
        //$connect_btn.textContent = address.slice(0, 4) + "..." + address.slice(-4);
        const $tmpl = document.createElement('template');
        $tmpl.innerHTML = login_menu; 
        const $login_menu = $tmpl.content.cloneNode(true); //document.getElementById('profile_menu').content.cloneNode(true);
        $login_menu.querySelector('.d-wallet-address').textContent = address.slice(0, 4) + "..." + address.slice(-4);
        $menu_side_area.appendChild($login_menu);
        $connect_btn.style.display = 'none';
        window.menu_arrow();

        // get balance
        const toncenterBaseEndpoint = true ? "https://testnet.toncenter.com" : "https://toncenter.com";
        const client = new TonClient({
            endpoint: `${toncenterBaseEndpoint}/api/v2/jsonRPC`,
            apiKey: '',
        });
        const balance = await client.getBalance(tonConnectUI.account.address);
        console.log("balance:", fromNano(balance));
        document.querySelector('.d-balance span').textContent = fromNano(balance);
    } else {
        $menu_side_area.querySelector('.de-login-menu').remove();
        $connect_btn.style.display = '';
    }

    // if (wallet && wallet.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof) {
    //     checkProofInYourBackend(wallet.connectItems.tonProof.proof);
    // }
});

async function connectToWallet() {
    const connectedWallet = await tonConnectUI.connectWallet();
    console.log(connectedWallet);
}

$connect_btn.addEventListener("click", e=> {
    e.preventDefault();
    connectToWallet().catch(error => {
        console.error("Error connecting to wallet:", error);
    })
});