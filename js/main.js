// Dynamic Content
let navLink = document.querySelectorAll('.nav-link');
const content = document.querySelector('#content');

navLink[0].classList.add('nav-link-active')
navLink.forEach(e=> {
    e.addEventListener('click', ()=>{
        let xhr = new XMLHttpRequest;
        xhr.open("GET", `views/${e.innerHTML}.php`);
        xhr.onreadystatechange = () => {
            if(xhr.status == 200 && xhr.readyState == 4) {
                content.innerHTML = xhr.responseText;

                navLink.forEach(el => {
                    if(el != e) {
                        el.classList.remove('nav-link-active');
                        return
                    } else {
                        el.classList.add('nav-link-active');
                    }
                })
                
                // Mahasiswa View Show
                if(e.dataset.page == 'mahasiswa') {

                    let tableMahasiswa = document.querySelector('#table-mahasiswa');
                    let xhrTable = new XMLHttpRequest;

                    xhrTable.open("GET", `data/mahasiswa.json`);
                    xhrTable.onreadystatechange = () => {
                        if(xhrTable.status == 200 && xhrTable.readyState == 4) {
                            let result = JSON.parse(xhrTable.response);

                            result.dosen.forEach((e, i)=> {
                                tableMahasiswa.innerHTML += `
                                    <tr>
                                        <th class="text-center" scope="row">${i+1}</th>
                                        <td class="text-center">${e.nidn}</td>
                                        <td class="text-center">${e.nama}</td>
                                        <td class="text-center">${e.nama_prodi}</td>
                                        <td class="text-center">${e.nama_pt}</td>
                                    </tr>`;
                            })

                            new DataTable('#myTable', {
                                scrollX: true,
                            })
                        
                        };
                    };
                    xhrTable.send();
                };

                // Contact View Show
                const msgSendAlert = document.querySelector('#message-send-alert');
                const btnSendMsg = document.querySelector('#btn-send-message');

                console.log(btnSendMsg)

                btnSendMsg.addEventListener('click', ()=> {
                    msgSendAlert.classList.remove('d-none');
                    setTimeout(() => {
                        msgSendAlert.classList.add('d-none');
                    }, 5000);
                    btnSendMsg.parentElement.parentElement.reset()
                });
            };
        };
        xhr.send();

    }) 
    
});

let btnHomeToMhs = () => {
    navLink[1].click();
}

const navMenu = document.querySelector('#nav-menu');
const hamMenu = document.querySelector('#ham-menu');

hamMenu.addEventListener('click', ()=> {
    navMenu.classList.toggle('ham-menu-open');
    hamMenu.classList.toggle('fixed');
    hamMenu.classList.toggle('right-3');
    document.body.classList.toggle('overflow-hidden');
    if(navMenu.classList.contains('ham-menu-open')) {
        navLink.forEach(e=> {
            e.addEventListener('click', ()=> {
                navMenu.classList.remove('ham-menu-open');
            })
        })
    }
})
