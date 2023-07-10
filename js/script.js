const empties = document.querySelectorAll('.empty')
const c = document.querySelectorAll(".c")
const createButton = document.querySelector('.create')
const modal = document.querySelector('#modal')
const change_modal = document.querySelector('#change-modal')
const closeButton = document.querySelector('.close')
const taskForm = document.querySelector('#form')
const change_form = document.querySelector('#change-form')
const close_change = document.querySelector('#cancel')
const taskStatusSelect = document.querySelector('#task-status')
const newItem = document.querySelector('new')
const executorsSelect = document.querySelector('#executors')
const ava = document.querySelector('#open_add_modal')
const cl = document.querySelector('#close')
const add_ava = document.querySelector('.im')
const show_add = document.querySelector("#add_modal")
const add_form = document.querySelector("#add-form")
const new_name = document.querySelector("#name")
const no_prof = document.querySelector("#profession")
const box_sel = document.querySelector('.selected-items')
const audio = document.querySelector('.audio')
const trash = document.querySelector('.trash');
const input_name = document.querySelector("#name")
const input_desc = document.querySelector("#description")
const input_time = document.querySelector("#deadline")
const input_status = document.querySelector("#status")
const status_inp = document.querySelector("#create-status")
const input_select = document.querySelector(".change__selected-items")
const multiInp = document.querySelector(".multiSelect select")
const multiSel = document.querySelector(".multiSel select")
const selctedCont = document.querySelector(".multiSelect .selected-items")
const executors_box = document.querySelector(".executors-box")
const elements = document.querySelector("body").querySelectorAll('*');
const executors_count = document.querySelector("#count")
const icons = document.querySelectorAll(".icon")


let selected = []
let todos = []
let globalID

const team = [
	{
		id: Math.random(),
		name: 'John Doe',
		profession: 'Developer',
		icon: 'icon1.png'
	},
	{
		id: Math.random(),
		name: 'Jane Smith',
		profession: 'Designer',
		icon: 'icon2.png'
	},
	{
		id: Math.random(),
		name: 'Mike Johnson',
		profession: 'Project Manager',
		icon: 'icon3.png'
	},
	{
		id: Math.random(),
		name: 'Sarah Williams',
		profession: 'Marketing Specialist',
		icon: 'icon4.png'
	},
	{
		id: Math.random(),
		name: 'David Brown',
		profession: 'QA Engineer',
		icon: 'icon5.png'
	},
	{
		id: Math.random(),
		name: 'Emily Davis',
		profession: 'Data Analyst',
		icon: 'icon6.png'
	},
	{
		id: Math.random(),
		name: 'Michael Clark',
		profession: 'Business Analyst',
		icon: 'icon7.png'
	},
	{
		id: Math.random(),
		name: 'Olivia Taylor',
		profession: 'Content Writer',
		icon: 'icon8.png'
	},
	{
		id: Math.random(),
		name: 'Daniel Wilson',
		profession: 'UX/UI Designer',
		icon: 'icon9.png'
	},
	{
		id: Math.random(),
		name: 'Sophia Lee',
		profession: 'Product Manager',
		icon: 'icon10.png'
	}
]


function reload(arr) {
	empties.forEach(el => el.innerHTML = "")
	for (let task of arr) {
		let div = document.createElement('div')
		let h3 = document.createElement('h3')
		let p_des = document.createElement('p')
		let p_dline = document.createElement('p')
		let span_dl = document.createElement('span')
		let img_dl = document.createElement('img')
		let p_who = document.createElement('div')
		let edit = document.createElement("span")
		let edit_img = document.createElement("img")

		div.draggable = true
		div.id = task.id
		div.classList.add('items')
		edit.classList.add("edit")
		p_who.classList.add('bottom_item')
		p_dline.classList.add('deadline')
		img_dl.classList.add("exec-member")
		edit_img.draggable = false
		img_dl.draggable = false

		if (task.deadline === '') {
			img_dl = ''
		} else {
			img_dl.src = "icons/deadline.png"
		}

		h3.innerHTML = task.name
		span_dl.innerHTML = formatDate(task.deadline)
		edit_img.src = "./icons/pencil.svg"
		if (task.description) p_des.innerHTML = task.description

		edit.onclick = () => {
			change_modal.style.display = "block"
			input_name.value = task.name
			input_desc.value = task.description
			input_time.value = task.deadline
			selected = task.executors
			for (let i = 0; i < input_status.options.length; i++) {
				if (input_status.options[i].value === task.status) {
					input_status.selectedIndex = i;
					break;
				}
			}

			globalID = div.id
			reloadSelected(task.executors, input_select)
			render_create(team, multiSel)
		}

		div.onmouseenter = () => {
			edit.style.display = 'block'
		}
		div.onmouseleave = () => {
			edit.style.display = 'none'
		}

		for (let exec of task.executors) {
			let img_icon = document.createElement('img')
			img_icon.draggable = false
			img_icon.src = `icons/${exec.icon}`
			img_icon.title = exec.name
			p_who.append(img_icon)
		}

		div.append(h3, edit)
		if (task.description) div.append(p_des)
		if (p_who.innerHTML !== '') div.append(p_who)
		if (task.deadline) div.append(p_dline)
		p_dline.append(img_dl, span_dl)
		edit.append(edit_img)

		empties[task.status].append(div)

		div.ondragstart = function () {
			this.classList.add('is-dragging')
			this.classList.add('hold')
			globalID = div.id
			trash.classList.add('active');
			setTimeout(() => (div.classList.add('invisible')), 0)
		}
		div.ondragend = function () {
			trash.classList.remove('opened');
			trash.classList.remove('active');
		};
		trash.ondragenter = (e) => {
			e.preventDefault()
		}
		trash.ondragover = (event) => {
			event.preventDefault()
			trash.classList.add('opened');
		}
		trash.ondragleave = () => {
			trash.classList.remove('opened');
		}
		trash.ondrop = function (event) {
			event.preventDefault()
			todos = todos.filter(el => el.id != +globalID)
			audio.playbackRate = 1.8;
			audio.volume = "0.5"
			audio.play()
			div.remove()
		}
	}
}



for (let item of c) {
	item.ondragover = (event) => {
		event.preventDefault()
	}
	item.ondragend = () => {
		reload(todos)
		c.forEach(el => el.className = "c")
	}
	item.ondrop = function (event) {
		event.preventDefault()
		let finded = todos.find(el => el.id === +globalID)
		empties.forEach(el => el.style.background = "none")
		let box = this.firstElementChild.nextElementSibling
		finded.status = box.id
		finded.className = "items"
		box.append(finded)
		box.className = "empty"
		reload(todos)
	}
}
for (let empty of empties) {
	empty.ondragenter = function () {
		empties.forEach(el => el.style.background = "none")
		empty.style.background = "rgba(255, 255, 255, 0.05)"
	}
	empty.ondragleave = () => {
		empties.forEach(el => el.style.background = "none")
	}
	empty.ondrop = function (event) {
		event.preventDefault()
		empty.className = "empty"
		reload(todos)
	}
}


add_form.onsubmit = function (event) {
	event.preventDefault()
	let selectedIcon = document.querySelector(".icon.selected-icon")
	if (!selectedIcon) {
		add_ava.style.opacity = '1'
		return
	}
	add_ava.style.opacity = '0'
	const icon = selectedIcon.getAttribute("data-icon")
	const teamMember = {
		id: Math.random(),
		icon: icon
	}
	let fm = new FormData(add_form)
	fm.forEach((value, key) => {
		teamMember[key] = value
	})
	team.push(teamMember)

	selectedIcon.classList.remove("selected-icon")
	show_add.style.display = "none"
	event.target.reset()
	reload_executors(team.slice(0, 3))
	render_create(team, multiInp)
	render_create(team, multiSel)
}
taskForm.onsubmit = function (elem) {
	elem.preventDefault()
	let task = {
		id: Math.random()
	}

	let fm = new FormData(taskForm)

	fm.forEach((value, key) => {
		task[key] = value
	})

	task.executors = selected

	modal.style.display = 'none'
	todos.push(task)
	reload(todos)
	selected = []
	elem.target.reset()
}
change_form.onsubmit = (e) => {
	e.preventDefault()
	let finded = todos.find(el => el.id === +globalID)
	if (finded) {
		finded.name = input_name.value
		finded.description = input_desc.value
		finded.deadline = input_time.value
		finded.exacutors = selected
		finded.status = input_status.value
		reload(todos)
	}
	change_modal.style.display = "none"
	selected = []
	globalID = ''
}


function render_create(arr, arg) {
	arg.innerHTML = ""
	let hide = new Option(" ")
	hide.hidden = true;
	arg.append(hide)
	let temp = []
	temp = selected.map(el => el.id)

	arr.forEach(item => {
		let opt = new Option(item.name, JSON.stringify(item))
		let filtred = JSON.parse(opt.value)
		if (!temp.includes(filtred.id)) {
			arg.append(opt)
		}
	})
}
function reloadSelected(arr, select) {
	select.innerHTML = ""

	for (let item of arr) {
		select.innerHTML += `
			<div class="selected" id="${item.id}" >
				<img src="icons/${item.icon}"/>
				<span>${item.name}</span>
				<span class="del-btn">&times;</span>
			</div>
		`
	}
	const delBtns = select.parentElement.lastElementChild?.querySelectorAll('.del-btn')

	delBtns.forEach(btn => {
		btn.onclick = (event) => {
			let key = event.target.parentElement.parentElement.getAttribute("class")
			let id = +btn.parentElement.id
			selected = selected.filter(el => el.id !== id)
			if (key === "change__selected-items") {
				let finded = todos.find(el => el.id === +globalID)
				finded.executors = selected
			}
			reloadSelected(selected, select)
			render_create(team, multiInp)
			render_create(team, multiSel)
		}
	})
}
function reload_empties(input) {
	input_status.innerHTML = ""
	for (let i = 0; i < empties.length; i++) {
		const element = empties[i];
		let id = element.id = i
		let txt = element.parentElement.firstElementChild.textContent
		let opt = new Option(txt, id)
		input.append(opt)
	}
}
function reload_executors(arr) {
	executors_box.textContent = ""
	for (const exec of arr) {
		const div = document.createElement("div")
		const img = document.createElement("img")
		div.classList.add("executors-box__item")
		img.src = `./icons/${exec.icon}`

		div.append(img)
		executors_box.append(div)
		executors_count.textContent = team.length - arr.length
	}
}
let miltiInps = [multiInp, multiSel]
let selectContainers = [selctedCont, input_select]
miltiInps.forEach((sel, idx) => {
	sel.onchange = (e) => {
		let item = JSON.parse(e.target.value)
		if (!selected.find(el => el.id === item.id)) {
			selected.push(item)
		} else {
			selected = selected.filter(el => el.id !== item.id)
		}
		sel.value = ""
		reloadSelected(selected, selectContainers[idx])
		render_create(team, multiInp)
		render_create(team, multiSel)
	}
})








for (const icon of icons) {
	icon.onclick = () => {
		const selectedIcon = document.querySelector(".icon.selected-icon")
		if (selectedIcon) {
			selectedIcon.classList.remove("selected-icon")
		}
		icon.classList.add("selected-icon")
	}
}
function formatDate(dateString) {
	if (!dateString || dateString.trim() === '') {
		return "";
	}
	let parts = dateString.split("-");
	let year = parseInt(parts[0]);
	let month = parseInt(parts[1]);
	let day = parseInt(parts[2]);
	let date = new Date(year, month - 1, day);
	let monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
	let monthName = monthNames[date.getMonth()];
	let dayNumber = date.getDate();
	let formattedDate = `${dayNumber} ${monthName}`;
	return formattedDate;
}
function close(click, arg) {
	click.onclick = () => {
		arg.style.display = "none"
	}
}
close_change.onclick = () => {
	change_modal.style.display = "none"
	selected = []
}
close(cl, show_add)
close(closeButton, modal)
close(close_change, change_modal)
close(document.querySelector("#close_modal"), modal)
elements.forEach(function (element) {
	element.draggable = false;
});
createButton.onclick = () => {
	modal.style.display = 'block'
	reloadSelected(selected, selctedCont)
}
ava.onclick = () => {
	show_add.style.display = "flex";
}
window.ondragstart = function (event) {
	if (typeof event.target.value === "string") {
		event.preventDefault();
	}
}
$(function () {
	$("#myDateInput").datepicker({
		showAnim: "slideDown",
		dateFormat: "yy-mm-dd",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		currentText: "Сегодня",
		closeText: "Закрыть",
		beforeShow: function (input, inst) {
			inst.dpDiv.css("background-color", "#323940");
			inst.dpDiv.css("color", "#a6b1be");
		}
	});
});
$(function () {
	$("#deadline").datepicker({
		showAnim: "slideDown",
		dateFormat: "yy-mm-dd",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		currentText: "Сегодня",
		closeText: "Закрыть",
		beforeShow: function (input, inst) {
			inst.dpDiv.css("background-color", "#323940"),
				inst.dpDiv.css("color", "#a6b1be");
		}
	});
});
reload_empties(status_inp)
reload_empties(input_status)
reload_executors(team.slice(0, 3))
render_create(team, multiInp)
