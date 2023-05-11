let uslugi_array = [
  "Wyciek pod zlewem",
  "Muszla do wymiany",
  "Montaż kranu",
  "Kaloryfer nie grzeje",
  "Woda nie schodzi",
  "Pęknięta rura",
  "Bojler nie działa",
  "Montaż kabin prysznicowych",
  "Spłuczka przecieka",
  "Montaż oświetlenia",
  "Wyrwane gniazdka",
  "Podłączanie płyt indukcyjnych",
  "Wymiana bezpieczników",
  "Gniazdko nie działa",
  "Brak prądu",
  "Pralka nie pobiera wody",
  "Pralka nie grzeje wody",
  "Zatkany filtr w pralce",
  "Bęben się nie kręci",
  "Pralka wyświetla błąd",
  "Pralka przecieka",
  "Piekarnik nie nagrzewa się",
  "Piekarnik nie włącza się",
  "Piekarnik wybija korki",
  "Piekarnik wyświetla błąd",
  "Zmywarka nie pobiera wody",
  "Zmywarka nie odprowadza wody",
  "Zmywarka nie grzeje wody",
  "Zmywarka nie rusza",
  "Zmywarka wyświetla błąd",
  "Drzwi zmywarki opadają",
  "Wieszanie telewizora na ścianie",
  "Skręcanie łóżek",
  "Skręcanie szaf",
  "Montaż półek",
  "Regulacja i wymiana drzwi",
  "Remonty i wykańczanie wnętrz",
  "Malowanie i tapetowanie ścian",
  "Serwis klimatyzacji",
  "Wymiana zamków do drzwi",
  "Serwis kuchenek gazowych",
];

function sendFormThroughTelegramBot(message_text) {
  let bot_token = "1347013159:AAGLdwspQRZo7zo2KFJEyCZLW1Wnl0jQixA";
  let my_chat_id = "647214244";
  let chat_id = "5287594737";
  let url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${chat_id}&text=${message_text}&parse_mode=html`;

  console.log(url);

  let api = new XMLHttpRequest();
  api.open("GET", url, true);
  api.send();

  $('button[type="submit"]').removeClass("btn-light");
  $('button[type="submit"]').addClass("btn-success");
  $('button[type="submit"]').text("Wysłano");
  $('button[type="submit"]').append('<i class="fa fa-check ml-2"></i>');
  $('button[type="submit"]').prop("disabled", true);
}

function submitForm() {
  let name = $("#name").val();
  let phone = $("#phone").val();
  let email = $("#email").val();
  let client_type = $("#client_type").val();
  let service = $(".value-selected").text();
  let city = $("#city").val();
  let zip = $("#zip").val();

  let street = $("#street").val();
  let house_number = $("#house_number").val();
  let apartment_number = $("#apartment_number").val();

  let notes = $("#notes").val();

  $("#name").val("");
  $("#phone").val("");
  $("#email").val("");
  $("#zip").val("");

  $("#street").val("");
  $("#house_number").val("");
  $("#apartment_number").val("");

  $("#notes").val("");

  let message_text = `<b>Imię</b>: ${name} %0A<b>Telefon</b>: ${phone} %0A<b>Usluga</b>: ${service} %0A<b>Adres</b>: ${street} ${house_number} / ${apartment_number}%0A<b>Opis problemu</b>: ${notes}%0A<b>Kod pocztowy</b>: ${zip}%0A<b>Typ klienta</b>: ${client_type}%0A<b>Email</b>: ${email}`;

  sendFormThroughTelegramBot(message_text);
}

let myModalAlternative;

$(document).ready(function () {
  $("#form").on("submit", function (e) {
    e.preventDefault();
    submitForm();
  });

  if ($("#modal").length != 0) {
    myModalAlternative = new bootstrap.Modal("#modal", {});
  }

  for (const usluga of uslugi_array) {
    $(".custom-select .options ul").append(
      "<li onclick=\"selectUsluga('" +
        usluga +
        '\')" class="option">' +
        usluga +
        "</li>"
    );
  }

  $(".custom-select .value-selected").on("click", function () {
    $(this).closest(".custom-select").find(".options").toggleClass("d-none");
  });

  // przyciski uslug (obrazki)
  $("a.usluga").on("click", function (e) {
    e.preventDefault();

    // console.log( $(this).attr('title') )

    $(".custom-select .value-selected").text($(this).attr("title"));

    if (myModalAlternative != null) {
      myModalAlternative.show();
    } else {
      scrollToForm();
    }
  });

  // przycisk po prawej (sidebar)
  $(".catalog_contact_buttons .mybtn").on("click", function (e) {
    e.preventDefault();
    myModalAlternative.show();
  });

  $(".options input").on("keyup", function () {
    let search_value = $(this).val();
    console.log(search_value);

    let regex = new RegExp(search_value, "i");

    let new_array = uslugi_array.filter((item) => regex.test(item));

    $(".custom-select .options ul").empty();
    for (const usluga of new_array) {
      $(".custom-select .options ul").append(
        "<li onclick=\"selectUsluga('" +
          usluga +
          '\')" class="option">' +
          usluga +
          "</li>"
      );
    }
  });
});

function openModal() {
  myModalAlternative.show();
}

function selectUsluga(text) {
  $(".options input").val("");
  $(".custom-select .value-selected").text(text);
  $(".custom-select .options").toggleClass("d-none");
  for (const usluga of uslugi_array) {
    $(".custom-select .options ul").append(
      "<li onclick=\"selectUsluga('" +
        usluga +
        '\')" class="option">' +
        usluga +
        "</li>"
    );
  }
}

function scrollToForm() {
  $("html, body").animate(
    {
      scrollTop: $("#contact").offset().top - 60,
    },
    0
  );
}
