<template>
  <PageAtom class="overview-controller">
    <h2 class="page-title">Hola, {{ email }}</h2>

    <div class="center examplex">
      <vs-dialog width="550px" not-center overflow-hidden v-model="active">
        <template #header>
          <h4 class="not-margin">¡Muy fácil!</h4>
        </template>

        <div class="con-content">
          <p>
            Ya mismo puedes minimizar esta ventana, sólo tienes que abrir tu
            juego favorito y clipear tu jugada. Una vez acabes tendrás tus clips
            en nuestra aplicación para Android/iOS o en nuestra página web.
            <br /><br />
            Si lo deseas, puedes cambiar el atajo del teclado para capturar tu
            jugada, activar tu micrófono, grabar tu música de fondo, o cambiar
            la duración del clip.
            <br /><br />
            Si tienes algúna duda o sugerencia, por favor escríbenos a
            "hello@nexusclips.com" o entra a nuestro canal de Discord"
          </p>
        </div>

        <template #footer>
          <div class="con-footer">
            <vs-button @click="active = false" transparent> Cerrar </vs-button>
          </div>
        </template>
      </vs-dialog>

      <vs-button class="faqcustom" block @click="active = !active">
        ¿Cómo funciona?
      </vs-button>

      <vs-button block success @click="misClips()">
        VER MIS CLIPS
        <i class="bx bxs-paint-roll"></i>
      </vs-button>
    </div>

    <div class="center con-switch">
      <ul>
        <li>
          <vs-tooltip bottom danger>
            <p>Atajo teclado</p>
            <template #tooltip>
              Este será tu comando del teclado para capturar tus mejores jugadas
              mientras juegas.
            </template>
          </vs-tooltip>
          <vs-input v-model="ShortCutvalue" size="s" placeholder="" readonly />
        </li>

        <li>
          <vs-tooltip top primary>
            <p>Activar Micrófono</p>
            <template #tooltip>
              Se registrará el audio de tu micrófono junto al clip.
            </template>
          </vs-tooltip>
          <vs-switch square v-model="MicOnOption" v-on:click="MicOn()" />
        </li>
        <li>
          <vs-tooltip top primary>
            <p>Grabar sólo el audio del juego</p>
            <template #tooltip>
              Si lo desactivas, también se registrará lo que estés escuchando en
              Spotify o YouTube, por ejemplo.
            </template>
          </vs-tooltip>

          <vs-switch
            square
            v-model="OnlyGameSoundValue"
            v-on:click="OnlyGameSound()"
          />
        </li>

        <li>
          <vs-tooltip top primary>
            <p>Duración clip</p>
            <template #tooltip>
              Selecciona la duración de cada clip que guardes mientras juegas.
            </template>
          </vs-tooltip>
          <vs-select
            placeholder="Seleccionar"
            v-model="RecordTimeValue"
            v-on:change="RecordTime()"
          >
            <vs-option label="15 segundos" value="15"> 15 segundos </vs-option>
            <vs-option label="30 segundos" value="30"> 30 segundos </vs-option>
          </vs-select>
        </li>
      </ul>
    </div>

    <vs-tooltip top shadow not-hover v-model="activeTooltip1">
      <FlexLayout middle center>
        <div class="claim">
          Nexus Clips utiliza el servicio de Xbox Game Bar.
        </div>
      </FlexLayout>

      <FlexLayout middle center>
        <vs-button
          border
          class="logoutbtn"
          @click="activeTooltip1 = !activeTooltip1"
        >
          Cerrar sesión
        </vs-button>
      </FlexLayout>
      <template #tooltip>
        <div class="content-tooltip">
          <h4 class="center">Cerrar sesión</h4>
          <p>Si cierras sesión tus clips ya no se guardarán.</p>
          <footer>
            <vs-button @click="activeTooltip1 = false" transparent dark block>
              Cancelar
            </vs-button>
            <vs-button v-on:click="onClicked()" danger block>
              Cerrar sesión
            </vs-button>
          </footer>
        </div>
      </template>
    </vs-tooltip>
  </PageAtom>
</template>

<script>
import { logout } from "@/core/auth/authenticated/services/logout";
import { getAuthenticatedUser } from "@/core/auth/authenticated/services/get-authenticated-user";
import { xboxMicOn } from "@/core/auth/authenticated/services/xboxMicOn";
import { xboxOnlyGameSound } from "@/core/auth/authenticated/services/xboxOnlyGameSound";
import { xboxRecordTime } from "@/core/auth/authenticated/services/xboxRecordTime";

import "boxicons";
const { shell } = require("electron");
const { ipcRenderer } = require("electron");
var regedit = require("regedit");
regedit.setExternalVBSLocation("resources/regedit/vbs");

export default {
  name: "OverviewController",
  components: {},
  mounted: function () {
    this.$vs.setColor("primary", "#763EFF");
    this.$nextTick(function () {
      if (localStorage.getItem("PcDataShare") !== "true") {
        this.openLoading();
      }
      ipcRenderer.send("mixpanel_Gated", this.user.id);
    });
  },
  data() {
    return {
      ShortCutvalue: "Win + Alt + G",
      percent: 0,
      active: false,
      MicOnOption: false,
      OnlyGameSoundValue: true,
      RecordTimeValue: "15 segundos",
      user: null,
      activeTooltip1: false,
    };
  },
  computed: {
    email() {
      if (!this.user) {
        return "";
      }
      return this.user.email;
    },
  },
  async created() {
    this.user = await getAuthenticatedUser();
    // Read default values and render
    ipcRenderer.on(
      "xboxgameUserOptions",
      (
        event,
        MicrophoneCaptureEnabled,
        EnablePerAppAudio,
        HistoricalBufferLength,
        VKMSaveHistoricalVideo,
        VKSaveHistoricalVideo
      ) => {
        if (MicrophoneCaptureEnabled === 0) {
          this.MicOnOption = false;
        } else {
          this.MicOnOption = true;
        }
        if (EnablePerAppAudio === 0) {
          this.OnlyGameSoundValue = false;
        } else {
          this.OnlyGameSoundValue = true;
        }
        if (HistoricalBufferLength === 15) {
          this.RecordTimeValue = "15";
        } else {
          this.RecordTimeValue = "30";
        }
        if (VKMSaveHistoricalVideo === 0 || VKSaveHistoricalVideo === 0) {
          this.ShortCutvalue = "Win + Alt + G";
        } else {
          this.ShortCutvalue = "Win + Alt + G";
          //this.ShortCutvalue = VKMSaveHistoricalVideo + " - " + VKSaveHistoricalVideo;
        }
      }
    );
  },
  methods: {
    MicOn() {
      if (!this.MicOnOption === true) {
        xboxMicOn(1);
      } else {
        xboxMicOn(0);
      }
    },
    OnlyGameSound() {
      if (!this.OnlyGameSoundValue === true) {
        xboxOnlyGameSound(1);
      } else {
        xboxOnlyGameSound(0);
      }
    },
    RecordTime() {
      if (this.RecordTimeValue === "15") {
        xboxRecordTime(15);
      } else {
        xboxRecordTime(30);
      }
    },
    misClips() {
      shell.openExternal("https://nexusclips.com/misclips.php?desktop=1");
    },
    onClicked() {
      this.activeTooltip1 = false;
      this.logout();
    },
    async logout() {
      await logout();
      this.$router.push({ name: "auth.login" });
    },
    openLoading() {
      const loading = this.$vs.loading({
        percent: this.percent,
        text: "Optimizando equipo...",
        background: "#000",
        color: "#fff",
        scale: 2,
      });
      const interval = setInterval(() => {
        if (this.percent <= 100) {
          loading.changePercent(`${this.percent++}%`);
        }
      }, 40);
      setTimeout(() => {
        localStorage.setItem("PcDataShare", true);
        loading.close();
        clearInterval(interval);
        this.percent = 0;
      }, 4800);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/ui/themes/default/variables";

.overview-controller {
  height: inherit;
  margin: 0 auto;
  width: 70%;

  .page-title {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    color: $gray-5;
  }

  .logoutbtn {
    background: transparent;
    font-size: 10px;
    color: $gray-3;
    padding: 0px;
    margin: 0px;
    margin-top: 20px;
  }
}

.faqcustom {
  width: 60%;
}

.con-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.con-switch ul {
  width: 100%;
  padding: 0px;
}
.con-switch ul li {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  margin-top: 10px;
}
.con-switch ul li p {
  margin: 0px;
  color: $gray-5;
}
.con-switch >>> .vs-switch {
  margin: 5px;
}
.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end !important;
}

.center.examplex {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.content-tooltip .body {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.content-tooltip .body .vs-avatar-content {
  margin-top: -30px;
  border: 3px solid var(--vs-theme-layout);
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
}
.content-tooltip .body .text {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.55rem;
  padding: 10px;
  font-weight: normal;
}
.content-tooltip .body .text span {
  font-weight: bold;
  font-size: 0.7rem;
}
.content-tooltip footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-tooltip h4 {
  padding: 8px;
  margin: 0px;
  text-align: left;
}
.content-tooltip p {
  text-align: left;
  padding: 0px;
  margin: 0px;
  line-height: 1rem;
  padding-bottom: 5px;
  padding-left: 8px;
}

.claim {
  color: #464d5f;
  font-size: 9px;
  margin-top: 80px;
}

:not(input):not(textarea),
:not(input):not(textarea)::after,
:not(input):not(textarea)::before {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}
</style>
